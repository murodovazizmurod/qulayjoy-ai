import * as Hooks from '@mantine/hooks';
import * as Components from '@mantine/core';

import Filter from '@/pages/Home/List/Filter';

// styles
import styles from '../../List.module.scss';

interface IProps {
  opened: boolean;
  onClose: () => void;
  onFilterUpdate?: (filters: any) => void;
}

const FilterModal = ({ opened, onClose, onFilterUpdate }: IProps) => {
  const { width } = Hooks.useViewportSize();

  return (
    <Components.Modal.Root
      centered
      opened={opened}
      onClose={onClose}
      className={styles.modal}
      size={width > 992 ? '80%' : '100%'}
      transitionProps={{ transition: 'fade-up', duration: 300 }}
    >
      <Components.Modal.Overlay />
      <Components.Modal.Content>
        <Filter onClose={onClose} onFilterUpdate={onFilterUpdate} />
      </Components.Modal.Content>
    </Components.Modal.Root>
  );
};

export default FilterModal;
