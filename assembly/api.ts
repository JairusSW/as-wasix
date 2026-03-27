import * as raw from "./bindings/wasix_32v1";

export type Errno = i32;
export type Fd = i32;

export const WASIX_ERRNO_OVERFLOW: Errno = 61;

// @ts-expect-error: Decorators valid here
@inline export function isOk(errno: Errno): bool {
  return errno == raw.WASIX_ERRNO_SUCCESS;
}

export function ensureOk(errno: Errno, context: string = "wasix"): void {
  if (!isOk(errno)) {
    throw new Error(context + " failed with errno=" + errno.toString());
  }
}

export namespace clock {
  export function timeSet(id: i32, timestamp: i64): Errno {
    return raw.clock_time_set(id, timestamp);
  }
}

export namespace fs {
  export function getcwd(pathPtr: i32, pathLenPtr: i32): Errno {
    return raw.getcwd(pathPtr, pathLenPtr);
  }

  export function changedir(path: string): Errno {
    const bytes = String.UTF8.encode(path, false);
    return raw.chdir(i32(changetype<usize>(bytes)), bytes.byteLength);
  }

  export function dup(fd: Fd, outFdPtr: i32): Errno {
    return raw.fd_dup(fd, outFdPtr);
  }

  export function dup2(fd: Fd, minResultFd: Fd, cloexec: bool, outFdPtr: i32): Errno {
    return raw.fd_dup2(fd, minResultFd, cloexec ? 1 : 0, outFdPtr);
  }

  export function event(initialVal: i64, flags: i32, outFdPtr: i32): Errno {
    return raw.fd_event(initialVal, flags, outFdPtr);
  }

  export function pipe(outReadFdPtr: i32, outWriteFdPtr: i32): Errno {
    return raw.fd_pipe(outReadFdPtr, outWriteFdPtr);
  }

  export function openAt(
    dirfd: Fd,
    dirflags: i32,
    pathPtr: i32,
    pathLen: i32,
    oflags: i32,
    rightsBase: i64,
    rightsInheriting: i64,
    fdflags: i32,
    fdflagsext: i32,
    outFdPtr: i32,
  ): Errno {
    return raw.path_open2(
      dirfd,
      dirflags,
      pathPtr,
      pathLen,
      oflags,
      rightsBase,
      rightsInheriting,
      fdflags,
      fdflagsext,
      outFdPtr,
    );
  }

  export function fdFlagsGet(fd: Fd, outFlagsPtr: i32): Errno {
    return raw.fd_fdflags_get(fd, outFlagsPtr);
  }

  export function fdFlagsSet(fd: Fd, flags: i32): Errno {
    return raw.fd_fdflags_set(fd, flags);
  }
}

export namespace tty {
  export function get(statePtr: i32): Errno {
    return raw.tty_get(statePtr);
  }

  export function set(statePtr: i32): Errno {
    return raw.tty_set(statePtr);
  }
}

export namespace thread {
  export function spawnV2(threadStartPtr: i32, outTidPtr: i32): Errno {
    return raw.thread_spawn_v2(threadStartPtr, outTidPtr);
  }

  export function sleep(durationNs: i64): Errno {
    return raw.thread_sleep(durationNs);
  }

  export function id(outTidPtr: i32): Errno {
    return raw.thread_id(outTidPtr);
  }

  export function join(tid: i32): Errno {
    return raw.thread_join(tid);
  }

  export function parallelism(outSizePtr: i32): Errno {
    return raw.thread_parallelism(outSizePtr);
  }

  export function signal(tid: i32, signal: i32): Errno {
    return raw.thread_signal(tid, signal);
  }

  export function futexWait(futexPtr: i32, expected: i32, timeoutPtr: i32, outWokenPtr: i32): Errno {
    return raw.futex_wait(futexPtr, expected, timeoutPtr, outWokenPtr);
  }

  export function futexWake(futexPtr: i32, outWokenPtr: i32): Errno {
    return raw.futex_wake(futexPtr, outWokenPtr);
  }

  export function futexWakeAll(futexPtr: i32, outWokenPtr: i32): Errno {
    return raw.futex_wake_all(futexPtr, outWokenPtr);
  }

  export function exit(code: i32): void {
    raw.thread_exit(code);
  }
}

export namespace asyncRuntime {
  export function callbackSignal(symbolName: string): void {
    const bytes = String.UTF8.encode(symbolName, false);
    raw.callback_signal(i32(changetype<usize>(bytes)), bytes.byteLength);
  }

  export function epollCreate(outFdPtr: i32): Errno {
    return raw.epoll_create(outFdPtr);
  }

  export function epollCtl(epollFd: Fd, op: i32, fd: Fd, eventPtr: i32): Errno {
    return raw.epoll_ctl(epollFd, op, fd, eventPtr);
  }

  export function epollWait(epollFd: Fd, eventsPtr: i32, maxEvents: i32, timeoutNs: i64, outNeventsPtr: i32): Errno {
    return raw.epoll_wait(epollFd, eventsPtr, maxEvents, timeoutNs, outNeventsPtr);
  }
}

export namespace jump {
  export function checkpoint(snapshotPtr: i32, outLongsizePtr: i32): Errno {
    return raw.stack_checkpoint(snapshotPtr, outLongsizePtr);
  }

  export function restore(snapshotPtr: i32, value: i64): void {
    raw.stack_restore(snapshotPtr, value);
  }
}

export namespace proc {
  export function raiseInterval(signal: i32, intervalNs: i64, repeat: i32 = 0): Errno {
    return raw.proc_raise_interval(signal, intervalNs, repeat);
  }

  export function fork(copyMemory: bool, outPidPtr: i32): Errno {
    return raw.proc_fork(copyMemory ? 1 : 0, outPidPtr);
  }

  export function exec(path: string, args: string): void {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    raw.proc_exec(i32(changetype<usize>(p)), p.byteLength, i32(changetype<usize>(a)), a.byteLength);
  }

  export function exec2(path: string, args: string, envs: string): void {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    raw.proc_exec2(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
    );
  }

  export function exec3(path: string, args: string, envs: string, fdopsPtr: i32, fdopsLen: i32, signalActionsPtr: i32 = 0): Errno {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    return raw.proc_exec3(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
      fdopsPtr,
      fdopsLen,
      signalActionsPtr,
    );
  }

  export function spawn(
    path: string,
    args: string,
    envs: string,
    stdinMode: i32,
    stdoutMode: i32,
    stderrMode: i32,
    stdinFd: i32,
    stdoutFd: i32,
    stderrFd: i32,
    outPidPtr: i32,
  ): Errno {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    return raw.proc_spawn(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
      stdinMode,
      stdoutMode,
      stderrMode,
      stdinFd,
      stdoutFd,
      stderrFd,
      outPidPtr,
    );
  }

  export function spawn2(
    path: string,
    args: string,
    envs: string,
    fdopsPtr: i32,
    fdopsLen: i32,
    signalDispositionsPtr: i32,
    signalDispositionsLen: i32,
    searchPath: bool,
    pathEnv: string,
    outPidPtr: i32,
  ): Errno {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    const pe = String.UTF8.encode(pathEnv, false);
    return raw.proc_spawn2(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
      fdopsPtr,
      fdopsLen,
      signalDispositionsPtr,
      signalDispositionsLen,
      searchPath ? 1 : 0,
      i32(changetype<usize>(pe)),
      pe.byteLength,
      outPidPtr,
    );
  }

  export function id(outPidPtr: i32): Errno {
    return raw.proc_id(outPidPtr);
  }

  export function parent(pid: i32, outParentPidPtr: i32): Errno {
    return raw.proc_parent(pid, outParentPidPtr);
  }

  export function join(pidPtr: i32, flags: i32, outJoinStatusPtr: i32): Errno {
    return raw.proc_join(pidPtr, flags, outJoinStatusPtr);
  }

  export function signal(pid: i32, signal: i32): Errno {
    return raw.proc_signal(pid, signal);
  }

  export function signalsGet(bufPtr: i32): Errno {
    return raw.proc_signals_get(bufPtr);
  }

  export function signalsSizesGet(outSizePtr: i32): Errno {
    return raw.proc_signals_sizes_get(outSizePtr);
  }

  export function snapshot(): Errno {
    return raw.proc_snapshot();
  }
}

export namespace subprocess {
  export function spawn(
    path: string,
    args: string,
    envs: string,
    stdinMode: i32,
    stdoutMode: i32,
    stderrMode: i32,
    stdinFd: i32,
    stdoutFd: i32,
    stderrFd: i32,
    outPidPtr: i32,
  ): Errno {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    return raw.proc_spawn(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
      stdinMode,
      stdoutMode,
      stderrMode,
      stdinFd,
      stdoutFd,
      stderrFd,
      outPidPtr,
    );
  }

  export function spawn2(
    path: string,
    args: string,
    envs: string,
    fdopsPtr: i32,
    fdopsLen: i32,
    signalDispositionsPtr: i32,
    signalDispositionsLen: i32,
    searchPath: bool,
    pathEnv: string,
    outPidPtr: i32,
  ): Errno {
    const p = String.UTF8.encode(path, false);
    const a = String.UTF8.encode(args, false);
    const e = String.UTF8.encode(envs, false);
    const pe = String.UTF8.encode(pathEnv, false);
    return raw.proc_spawn2(
      i32(changetype<usize>(p)),
      p.byteLength,
      i32(changetype<usize>(a)),
      a.byteLength,
      i32(changetype<usize>(e)),
      e.byteLength,
      fdopsPtr,
      fdopsLen,
      signalDispositionsPtr,
      signalDispositionsLen,
      searchPath ? 1 : 0,
      i32(changetype<usize>(pe)),
      pe.byteLength,
      outPidPtr,
    );
  }

  export function join(pidPtr: i32, flags: i32, outJoinStatusPtr: i32): Errno {
    return raw.proc_join(pidPtr, flags, outJoinStatusPtr);
  }

  export function signal(pid: i32, signal: i32): Errno {
    return raw.proc_signal(pid, signal);
  }
}

export namespace net {
  export function bridge(networkPtr: i32, networkLen: i32, tokenPtr: i32, tokenLen: i32, securityPtr: i32 = 0): Errno {
    return raw.port_bridge(networkPtr, networkLen, tokenPtr, tokenLen, securityPtr);
  }

  export function unbridge(): Errno {
    return raw.port_unbridge();
  }

  export function dhcpAcquire(): Errno {
    return raw.port_dhcp_acquire();
  }

  export function addrAdd(addrCidrPtr: i32): Errno {
    return raw.port_addr_add(addrCidrPtr);
  }

  export function addrRemove(addrPtr: i32): Errno {
    return raw.port_addr_remove(addrPtr);
  }

  export function addrClear(): Errno {
    return raw.port_addr_clear();
  }

  export function mac(outHardwareAddressPtr: i32): Errno {
    return raw.port_mac(outHardwareAddressPtr);
  }

  export function addrList(addrsPtr: i32, naddrsPtr: i32): Errno {
    return raw.port_addr_list(addrsPtr, naddrsPtr);
  }

  export function gatewaySet(addrPtr: i32): Errno {
    return raw.port_gateway_set(addrPtr);
  }

  export function routeAdd(cidrPtr: i32, viaRouterPtr: i32, preferredUntilPtr: i32, expiresAtPtr: i32): Errno {
    return raw.port_route_add(cidrPtr, viaRouterPtr, preferredUntilPtr, expiresAtPtr);
  }

  export function routeRemove(cidrPtr: i32): Errno {
    return raw.port_route_remove(cidrPtr);
  }

  export function routeClear(): Errno {
    return raw.port_route_clear();
  }

  export function routeList(routesPtr: i32, nroutesPtr: i32): Errno {
    return raw.port_route_list(routesPtr, nroutesPtr);
  }

  export function socketStatus(fd: Fd, outStatusPtr: i32): Errno {
    return raw.sock_status(fd, outStatusPtr);
  }

  export function socketAddrLocal(fd: Fd, outAddrPortPtr: i32): Errno {
    return raw.sock_addr_local(fd, outAddrPortPtr);
  }

  export function socketAddrPeer(fd: Fd, outAddrPortPtr: i32): Errno {
    return raw.sock_addr_peer(fd, outAddrPortPtr);
  }

  export function socketOpen(af: i32, ty: i32, proto: i32, outFdPtr: i32): Errno {
    return raw.sock_open(af, ty, proto, outFdPtr);
  }

  export function socketPair(af: i32, ty: i32, proto: i32, outFd1Ptr: i32, outFd2Ptr: i32): Errno {
    return raw.sock_pair(af, ty, proto, outFd1Ptr, outFd2Ptr);
  }

  export function socketSetOptFlag(fd: Fd, sockopt: i32, flag: bool): Errno {
    return raw.sock_set_opt_flag(fd, sockopt, flag ? 1 : 0);
  }

  export function socketGetOptFlag(fd: Fd, sockopt: i32, outFlagPtr: i32): Errno {
    return raw.sock_get_opt_flag(fd, sockopt, outFlagPtr);
  }

  export function socketSetOptTime(fd: Fd, sockopt: i32, optionTimestampPtr: i32): Errno {
    return raw.sock_set_opt_time(fd, sockopt, optionTimestampPtr);
  }

  export function socketGetOptTime(fd: Fd, sockopt: i32, outOptionTimestampPtr: i32): Errno {
    return raw.sock_get_opt_time(fd, sockopt, outOptionTimestampPtr);
  }

  export function socketSetOptSize(fd: Fd, sockopt: i32, size: i64): Errno {
    return raw.sock_set_opt_size(fd, sockopt, size);
  }

  export function socketGetOptSize(fd: Fd, sockopt: i32, outSizePtr: i32): Errno {
    return raw.sock_get_opt_size(fd, sockopt, outSizePtr);
  }

  export function socketJoinMulticastV4(fd: Fd, multiaddrPtr: i32, interfacePtr: i32): Errno {
    return raw.sock_join_multicast_v4(fd, multiaddrPtr, interfacePtr);
  }

  export function socketLeaveMulticastV4(fd: Fd, multiaddrPtr: i32, interfacePtr: i32): Errno {
    return raw.sock_leave_multicast_v4(fd, multiaddrPtr, interfacePtr);
  }

  export function socketJoinMulticastV6(fd: Fd, multiaddrPtr: i32, interfaceIndex: i32): Errno {
    return raw.sock_join_multicast_v6(fd, multiaddrPtr, interfaceIndex);
  }

  export function socketLeaveMulticastV6(fd: Fd, multiaddrPtr: i32, interfaceIndex: i32): Errno {
    return raw.sock_leave_multicast_v6(fd, multiaddrPtr, interfaceIndex);
  }

  export function socketBind(fd: Fd, addrPortPtr: i32): Errno {
    return raw.sock_bind(fd, addrPortPtr);
  }

  export function socketListen(fd: Fd, backlog: i32): Errno {
    return raw.sock_listen(fd, backlog);
  }

  export function socketAccept(fd: Fd, flags: i32, outFdPtr: i32, outPeerAddrPtr: i32): Errno {
    return raw.sock_accept_v2(fd, flags, outFdPtr, outPeerAddrPtr);
  }

  export function socketConnect(fd: Fd, addrPortPtr: i32): Errno {
    return raw.sock_connect(fd, addrPortPtr);
  }

  export function socketRecvFrom(fd: Fd, riDataPtr: i32, riDataLen: i32, riFlags: i32, srcAddrPtr: i32, roDatalenPtr: i32, roFlagsPtr: i32): Errno {
    return raw.sock_recv_from(fd, riDataPtr, riDataLen, riFlags, srcAddrPtr, roDatalenPtr, roFlagsPtr);
  }

  export function socketSendTo(fd: Fd, siDataPtr: i32, siDataLen: i32, siFlags: i32, destAddrPtr: i32, soDatalenPtr: i32): Errno {
    return raw.sock_send_to(fd, siDataPtr, siDataLen, siFlags, destAddrPtr, soDatalenPtr);
  }

  export function socketSendFile(sockFd: Fd, inFd: Fd, offset: i64, count: i64, outSentLenPtr: i32): Errno {
    return raw.sock_send_file(sockFd, inFd, offset, count, outSentLenPtr);
  }

  export function resolve(hostPtr: i32, hostLen: i32, port: i32, entriesPtr: i32, entriesLen: i32, outNentriesPtr: i32): Errno {
    return raw.resolve(hostPtr, hostLen, port, entriesPtr, entriesLen, outNentriesPtr);
  }
}

export namespace dynamic {
  export function invalidHandle(handle: i32): Errno {
    return raw.dl_invalid_handle(handle);
  }

  export function open(pathPtr: i32, pathLen: i32, flags: i32, outHandlePtr: i32): Errno {
    return raw.dlopen(pathPtr, pathLen, flags, 0, 0, 0, 0, outHandlePtr);
  }

  export function symbol(handle: i32, symbolPtr: i32, symbolLen: i32, outAddressPtr: i32, outTypePtr: i32): Errno {
    return raw.dlsym(handle, symbolPtr, symbolLen, outAddressPtr, outTypePtr, 0);
  }

  export function call(fnPtr: i32, argsPtr: i32, argsLen: i32, retsPtr: i32, retsLen: i32): Errno {
    return raw.call_dynamic(fnPtr, argsPtr, argsLen, retsPtr, retsLen, 0);
  }

  export function closurePrepare(closureId: i32, fnPtr: i32, envPtr: i32, outFnPtr: i32, outEnvPtr: i32, outCidPtr: i32, outTokenPtr: i32): Errno {
    return raw.closure_prepare(closureId, fnPtr, envPtr, outFnPtr, outEnvPtr, outCidPtr, outTokenPtr);
  }

  export function closureAllocate(outClosureIdPtr: i32): Errno {
    return raw.closure_allocate(outClosureIdPtr);
  }

  export function closureFree(closureId: i32): Errno {
    return raw.closure_free(closureId);
  }

  export function reflectSignature(functionId: i32, argumentTypesPtr: i32, argumentTypesLen: i32, resultTypesPtr: i32, resultTypesLen: i32, outReflectionPtr: i32): Errno {
    return raw.reflect_signature(functionId, argumentTypesPtr, argumentTypesLen, resultTypesPtr, resultTypesLen, outReflectionPtr);
  }
}
