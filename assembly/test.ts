import { proc_snapshot } from "./index";

export function smoke(): i32 {
  return proc_snapshot();
}
