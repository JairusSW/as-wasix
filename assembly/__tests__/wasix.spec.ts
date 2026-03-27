import { describe, it, expect } from "as-test/assembly";
import {
  WASIX_BINDING_COUNT,
  WASIX_ERRNO_SUCCESS,
  WASIX_ERRNO_NOSYS,
  proc_snapshot,
  thread_sleep,
  ensureOk,
  thread,
  fs,
  proc,
  net,
  tty,
  jump,
  asyncRuntime,
  subprocess,
} from "../index";

describe("wasix_32v1 bindings", () => {
  it("exports the expected number of WASIX imports", () => {
    expect(WASIX_BINDING_COUNT).toBe(86);
  });

  it("can call proc_snapshot without trapping", () => {
    const errno = proc_snapshot();
    expect(errno == WASIX_ERRNO_SUCCESS || errno == WASIX_ERRNO_NOSYS).toBe(true);
  });

  it("can call thread_sleep(0)", () => {
    const errno = thread_sleep(0);
    expect(errno == WASIX_ERRNO_SUCCESS || errno == WASIX_ERRNO_NOSYS).toBe(true);
  });

  it("can query cwd with dynamic buffer handling", () => {
    const path = new Uint8Array(256);
    const pathLen = new Uint32Array(1);
    pathLen[0] = 256;
    const errno = fs.getcwd(i32(path.dataStart), i32(pathLen.dataStart));
    expect(errno == WASIX_ERRNO_SUCCESS || errno == WASIX_ERRNO_NOSYS).toBe(true);
    if (errno == WASIX_ERRNO_SUCCESS) {
      ensureOk(errno, "getcwd");
      expect(pathLen[0] > 0).toBe(true);
    }
  });

  it("supports namespace modules", () => {
    const sleep = thread.sleep(0);
    expect(sleep == WASIX_ERRNO_SUCCESS || sleep == WASIX_ERRNO_NOSYS).toBe(true);

    const snap = proc.snapshot();
    expect(snap == WASIX_ERRNO_SUCCESS || snap == WASIX_ERRNO_NOSYS).toBe(true);

    const path = new Uint8Array(256);
    const pathLen = new Uint32Array(1);
    pathLen[0] = 256;
    const cwd = fs.getcwd(i32(path.dataStart), i32(pathLen.dataStart));
    expect(cwd == WASIX_ERRNO_SUCCESS || cwd == WASIX_ERRNO_NOSYS).toBe(true);

    // Namespace compile checks for other feature areas.
    const _net = net.unbridge;
    const _tty = tty.get;
    const _async = asyncRuntime.epollCreate;
    const _sub = subprocess.join;
    const _jump = jump.checkpoint;
    expect(changetype<usize>(_net) > 0).toBe(true);
    expect(changetype<usize>(_tty) > 0).toBe(true);
    expect(changetype<usize>(_async) > 0).toBe(true);
    expect(changetype<usize>(_sub) > 0).toBe(true);
    expect(changetype<usize>(_jump) > 0).toBe(true);
  });
});
