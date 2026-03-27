import { errno, fd_write } from "../index";

const tempbuf = memory.data(3 * sizeof<usize>());
const msg = String.UTF8.encode("Hello, WASIX from as-wasix!\n", false);

store<usize>(tempbuf, changetype<usize>(msg));
store<usize>(tempbuf + sizeof<usize>(), msg.byteLength);

const err = fd_write(1, tempbuf, 1, tempbuf + 2 * sizeof<usize>());
if (err != errno.SUCCESS) {
  unreachable();
}
