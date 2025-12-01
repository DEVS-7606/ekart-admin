import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/atoms/dialog";
import Button from "@/shared/components/atoms/button";
import TagSelection from "@/shared/components/organisms/tagSelection";
import { DataTable } from "@/shared/components/organisms/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { ITag } from "@/pages/tags-master/type/tagMaster";

export interface TagSelectionOption {
  labelName: string;
  values: string[];
}

export interface TagFilteredAttachDialogProps<TItem> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttach: (items: TItem[]) => void;

  title: string;
  items: TItem[];
  columns: ColumnDef<TItem>[];

  tagOptions: ITag[];
  tagFilterPlaceholder: string;

  attachButtonLabel: string;

  /**
   * Optional custom tag parser. By default expects chips in "Label: Value" format.
   */
  parseChips?: (chips: string[]) => { label: string; value: string }[];

  /**
   * Optional custom filter function. By default expects each item to have a `tags` array.
   */
  filterItemsByTags?: (
    items: TItem[],
    parsedTags: { label: string; value: string }[]
  ) => TItem[];
}

const defaultParseChips = (
  chips: string[]
): { label: string; value: string }[] => {
  return chips
    .map((chip) => {
      const [label, value] = chip.split(":").map((part) => part.trim());
      if (!label || !value) return null;
      return { label, value } as const;
    })
    .filter(Boolean) as { label: string; value: string }[];
};

const defaultFilterItemsByTags = <
  TItem extends { tags?: { label: string; value: string }[] }
>(
  items: TItem[],
  parsedTags: { label: string; value: string }[]
): TItem[] => {
  if (!parsedTags.length) return items;

  return items.filter((item) => {
    const tags = item.tags ?? [];
    return parsedTags.every((selectedTag) =>
      tags.some(
        (tag) =>
          tag.label === selectedTag.label && tag.value === selectedTag.value
      )
    );
  });
};

export const TagFilteredAttachDialog = <TItem,>(
  props: TagFilteredAttachDialogProps<TItem>
) => {
  const {
    open,
    onOpenChange,
    onAttach,
    title,
    items,
    columns,
    tagOptions,
    tagFilterPlaceholder,
    attachButtonLabel,
    parseChips = defaultParseChips,
    filterItemsByTags,
  } = props;

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<TItem[]>([]);

  const effectiveFilterItemsByTags: (
    items: TItem[],
    parsedTags: { label: string; value: string }[]
  ) => TItem[] =
    filterItemsByTags ??
    (defaultFilterItemsByTags as unknown as (
      items: TItem[],
      parsedTags: { label: string; value: string }[]
    ) => TItem[]);

  const filteredItems = useMemo(() => {
    if (!selectedChips.length) return items;

    const parsed = parseChips(selectedChips);

    if (!parsed.length) return items;

    return effectiveFilterItemsByTags(items, parsed);
  }, [items, selectedChips, parseChips, effectiveFilterItemsByTags]);

  const handleAttach = () => {
    if (!selectedItems.length) return;
    onAttach(selectedItems);
  };

  const handleOnChange = (selectedTags: ITag[]) => {
    const chips = selectedTags.map((tag) => {
      const value = Array.isArray(tag.values)
        ? tag.values.join(", ")
        : String(tag.values);
      return `${tag.name}: ${value}`;
    });
    setSelectedChips(chips);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {(() => {
            const defaultTags: ITag[] = selectedChips
              .map((chip) => {
                const [rawLabel, ...rawValueParts] = chip.split(":");
                const label = rawLabel?.trim();
                const valueString = rawValueParts.join(":").trim();
                if (!label || !valueString) return null;

                const baseTag = tagOptions.find((tag) => tag.name === label);
                if (!baseTag) return null;

                return {
                  ...baseTag,
                  values: valueString,
                } as ITag;
              })
              .filter((tag): tag is ITag => tag !== null);

            return (
              <TagSelection
                options={tagOptions}
                placeholder={tagFilterPlaceholder}
                defaultValue={defaultTags}
                label={{
                  label: "Selected Labels",
                  component: "p",
                  variant: "sm",
                  weight: "semiBold",
                }}
                needAttachmentLabel={false}
                onChange={(selectedTags) => handleOnChange(selectedTags)}
              />
            );
          })()}

          <DataTable<TItem>
            data={filteredItems}
            columns={columns}
            options={{
              enableSorting: false,
              enablePagination: true,
              enableSelection: true,
              enableSearching: false,
              pageSizes: [5, 10, 20],
              visiblePages: 5,
              bodyClassName: "max-h-[420px] overflow-y-auto",
            }}
            onRowSelectionChange={(rows) => setSelectedItems(rows)}
            headerClassName="justify-start"
          />
        </div>

        <DialogFooter className="flex-row justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="px-5"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="px-5 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!selectedItems.length}
            onClick={handleAttach}
          >
            {attachButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
