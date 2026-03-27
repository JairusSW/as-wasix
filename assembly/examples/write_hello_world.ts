import { errno, fd_close, fd_write, oflags, path_open, rights } from "../index";

const path = String.UTF8.encode("hello_world.txt", false);
const msg = String.UTF8.encode("Hello, world!\n", false);
const fdPtr = memory.data(sizeof<u32>());
const iov = memory.data(3 * sizeof<usize>());

let wrote = false;
for (let dirFd: u32 = 3; dirFd <= 10; dirFd++) {
  const openErr = path_open(
    dirFd,
    0,
    changetype<usize>(path),
    path.byteLength,
    oflags.CREAT | oflags.TRUNC,
    rights.FD_WRITE,
    0,
    0,
    fdPtr,
  );
  if (openErr != errno.SUCCESS) continue;

  const outFd = load<u32>(fdPtr);
  store<usize>(iov, changetype<usize>(msg));
  store<usize>(iov + sizeof<usize>(), msg.byteLength);

  if (fd_write(outFd, iov, 1, iov + 2 * sizeof<usize>()) != errno.SUCCESS) unreachable();
  if (fd_close(outFd) != errno.SUCCESS) unreachable();
  wrote = true;
}

if (!wrote) unreachable();
