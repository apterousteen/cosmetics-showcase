import { MultiSelect } from '@mantine/core';
import { texts } from '../../constants/texts';

type CategoryFilterProps = {
  categories: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

/**
 * MultiSelect-фильтр по категориям.
 */
export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <MultiSelect
      mb="xs"
      data={categories}
      value={value}
      onChange={onChange}
      placeholder={value.length === 0 ? texts.filterPlaceholder : undefined}
      searchable
      clearable
    />
  );
}
