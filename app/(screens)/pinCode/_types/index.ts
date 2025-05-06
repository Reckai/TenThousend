import { STEPS } from "../_consts";

export type StepType = (typeof STEPS)[keyof typeof STEPS];
