// types/accordion.ts
export type AccordionType = "single" | "multiple";

export interface AccordionContext {
  activeItems: Ref<Set<string>>;
  toggleItem: (value: string) => void;
  type: AccordionType;
  collapsible: boolean;
}

export interface AccordionItemContext {
  isExpanded: ComputedRef<boolean>;
  value: string;
  disabled: boolean;
}
