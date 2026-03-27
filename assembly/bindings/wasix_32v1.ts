// Auto-generated from vendor/wasix-abi-rust/src/lib_generated32.rs
// Source module: wasix_32v1 extern "C" imports

export const WASIX_ERRNO_SUCCESS: i32 = 0;
export const WASIX_ERRNO_NOSYS: i32 = 52;


// @ts-expect-error: Decorators valid here
@external("wasix_32v1", "callback_signal")
export declare function callback_signal(arg0: i32, arg1: i32): void;

@external("wasix_32v1", "clock_time_set")
export declare function clock_time_set(arg0: i32, arg1: i64): i32;

@external("wasix_32v1", "fd_dup")
export declare function fd_dup(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "fd_dup2")
export declare function fd_dup2(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "fd_event")
export declare function fd_event(arg0: i64, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "fd_pipe")
export declare function fd_pipe(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "tty_get")
export declare function tty_get(arg0: i32): i32;

@external("wasix_32v1", "tty_set")
export declare function tty_set(arg0: i32): i32;

@external("wasix_32v1", "getcwd")
export declare function getcwd(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "chdir")
export declare function chdir(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "thread_spawn_v2")
export declare function thread_spawn_v2(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "thread_sleep")
export declare function thread_sleep(arg0: i64): i32;

@external("wasix_32v1", "thread_id")
export declare function thread_id(arg0: i32): i32;

@external("wasix_32v1", "thread_join")
export declare function thread_join(arg0: i32): i32;

@external("wasix_32v1", "thread_parallelism")
export declare function thread_parallelism(arg0: i32): i32;

@external("wasix_32v1", "thread_signal")
export declare function thread_signal(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "futex_wait")
export declare function futex_wait(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "futex_wake")
export declare function futex_wake(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "futex_wake_all")
export declare function futex_wake_all(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "thread_exit")
export declare function thread_exit(arg0: i32): void;

@external("wasix_32v1", "stack_checkpoint")
export declare function stack_checkpoint(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "stack_restore")
export declare function stack_restore(arg0: i32, arg1: i64): void;

@external("wasix_32v1", "path_open2")
export declare function path_open2(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i64, arg6: i64, arg7: i32, arg8: i32, arg9: i32): i32;

@external("wasix_32v1", "fd_fdflags_get")
export declare function fd_fdflags_get(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "fd_fdflags_set")
export declare function fd_fdflags_set(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "proc_raise_interval")
export declare function proc_raise_interval(arg0: i32, arg1: i64, arg2: i32): i32;

@external("wasix_32v1", "proc_fork")
export declare function proc_fork(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "proc_exec")
export declare function proc_exec(arg0: i32, arg1: i32, arg2: i32, arg3: i32): void;

@external("wasix_32v1", "proc_exec2")
export declare function proc_exec2(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): void;

@external("wasix_32v1", "proc_exec3")
export declare function proc_exec3(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32, arg7: i32, arg8: i32): i32;

@external("wasix_32v1", "proc_spawn")
export declare function proc_spawn(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32, arg7: i32, arg8: i32, arg9: i32, arg10: i32, arg11: i32, arg12: i32): i32;

@external("wasix_32v1", "proc_spawn2")
export declare function proc_spawn2(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32, arg7: i32, arg8: i32, arg9: i32, arg10: i32, arg11: i32, arg12: i32, arg13: i32): i32;

@external("wasix_32v1", "proc_id")
export declare function proc_id(arg0: i32): i32;

@external("wasix_32v1", "proc_parent")
export declare function proc_parent(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "proc_join")
export declare function proc_join(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "proc_signal")
export declare function proc_signal(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "proc_signals_get")
export declare function proc_signals_get(arg0: i32): i32;

@external("wasix_32v1", "proc_signals_sizes_get")
export declare function proc_signals_sizes_get(arg0: i32): i32;

@external("wasix_32v1", "proc_snapshot")
export declare function proc_snapshot(): i32;

@external("wasix_32v1", "port_bridge")
export declare function port_bridge(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32): i32;

@external("wasix_32v1", "port_unbridge")
export declare function port_unbridge(): i32;

@external("wasix_32v1", "port_dhcp_acquire")
export declare function port_dhcp_acquire(): i32;

@external("wasix_32v1", "port_addr_add")
export declare function port_addr_add(arg0: i32): i32;

@external("wasix_32v1", "port_addr_remove")
export declare function port_addr_remove(arg0: i32): i32;

@external("wasix_32v1", "port_addr_clear")
export declare function port_addr_clear(): i32;

@external("wasix_32v1", "port_mac")
export declare function port_mac(arg0: i32): i32;

@external("wasix_32v1", "port_addr_list")
export declare function port_addr_list(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "port_gateway_set")
export declare function port_gateway_set(arg0: i32): i32;

@external("wasix_32v1", "port_route_add")
export declare function port_route_add(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "port_route_remove")
export declare function port_route_remove(arg0: i32): i32;

@external("wasix_32v1", "port_route_clear")
export declare function port_route_clear(): i32;

@external("wasix_32v1", "port_route_list")
export declare function port_route_list(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_status")
export declare function sock_status(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_addr_local")
export declare function sock_addr_local(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_addr_peer")
export declare function sock_addr_peer(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_open")
export declare function sock_open(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "sock_pair")
export declare function sock_pair(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32): i32;

@external("wasix_32v1", "sock_set_opt_flag")
export declare function sock_set_opt_flag(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_get_opt_flag")
export declare function sock_get_opt_flag(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_set_opt_time")
export declare function sock_set_opt_time(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_get_opt_time")
export declare function sock_get_opt_time(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_set_opt_size")
export declare function sock_set_opt_size(arg0: i32, arg1: i32, arg2: i64): i32;

@external("wasix_32v1", "sock_get_opt_size")
export declare function sock_get_opt_size(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_join_multicast_v4")
export declare function sock_join_multicast_v4(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_leave_multicast_v4")
export declare function sock_leave_multicast_v4(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_join_multicast_v6")
export declare function sock_join_multicast_v6(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_leave_multicast_v6")
export declare function sock_leave_multicast_v6(arg0: i32, arg1: i32, arg2: i32): i32;

@external("wasix_32v1", "sock_bind")
export declare function sock_bind(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_listen")
export declare function sock_listen(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_accept_v2")
export declare function sock_accept_v2(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "sock_connect")
export declare function sock_connect(arg0: i32, arg1: i32): i32;

@external("wasix_32v1", "sock_recv_from")
export declare function sock_recv_from(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32): i32;

@external("wasix_32v1", "sock_send_to")
export declare function sock_send_to(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): i32;

@external("wasix_32v1", "sock_send_file")
export declare function sock_send_file(arg0: i32, arg1: i32, arg2: i64, arg3: i64, arg4: i32): i32;

@external("wasix_32v1", "resolve")
export declare function resolve(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): i32;

@external("wasix_32v1", "epoll_create")
export declare function epoll_create(arg0: i32): i32;

@external("wasix_32v1", "epoll_ctl")
export declare function epoll_ctl(arg0: i32, arg1: i32, arg2: i32, arg3: i32): i32;

@external("wasix_32v1", "epoll_wait")
export declare function epoll_wait(arg0: i32, arg1: i32, arg2: i32, arg3: i64, arg4: i32): i32;

@external("wasix_32v1", "dl_invalid_handle")
export declare function dl_invalid_handle(arg0: i32): i32;

@external("wasix_32v1", "dlopen")
export declare function dlopen(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32, arg7: i32): i32;

@external("wasix_32v1", "dlsym")
export declare function dlsym(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): i32;

@external("wasix_32v1", "call_dynamic")
export declare function call_dynamic(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): i32;

@external("wasix_32v1", "closure_prepare")
export declare function closure_prepare(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32, arg6: i32): i32;

@external("wasix_32v1", "closure_allocate")
export declare function closure_allocate(arg0: i32): i32;

@external("wasix_32v1", "closure_free")
export declare function closure_free(arg0: i32): i32;

@external("wasix_32v1", "reflect_signature")
export declare function reflect_signature(arg0: i32, arg1: i32, arg2: i32, arg3: i32, arg4: i32, arg5: i32): i32;

export const WASIX_BINDING_COUNT: i32 = 86;