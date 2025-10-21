import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import uzFlag from '@/assets/images/uz-flag.svg';
import ruFlag from '@/assets/images/ru-flag.svg';

import * as Components from '@mantine/core';

import styles from './LanguageSwitcher.module.scss';
import './LanguageSwitcher.module.scss';
import { useQueryClient } from '@tanstack/react-query';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const languages = {
    uz: { key: 'uz', shortName: "O'z", label: "O'zbekcha", flag: uzFlag },
    ru: { key: 'ru', shortName: 'Ру', label: 'Русский', flag: ruFlag }
  } as const;

  type LangKey = keyof typeof languages;

  const [value, setValue] = useState<string>(i18n.language);

  const combobox = Components.useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  const handleLanguageChange = (language: string) => {
    setValue(language);
    i18n.changeLanguage(language);
    combobox.closeDropdown();
    queryClient.invalidateQueries();
  };

  const languageOptions = (Object.keys(languages) as LangKey[]).map(key => (
    <Components.Combobox.Option value={languages[key].key} key={languages[key].key} className={styles.menu_wrapper}>
      <img src={languages[key].flag} width={16} className={styles.flag} />
      {languages[key].label}
    </Components.Combobox.Option>
  ));

  return (
    <Components.Combobox store={combobox} onOptionSubmit={handleLanguageChange}>
      <Components.Combobox.Target>
        <Components.InputBase
          pointer
          type="button"
          component="button"
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          classNames={{ input: styles.selectInput }}
          className={styles.input_base}
          rightSection={<Components.Combobox.Chevron />}
        >
          <div className={styles.item_wrapper}>
            <img
              src={languages[value as LangKey]?.flag}
              width={16}
              className={styles.flag}
              alt={languages[value as LangKey]?.label}
            />
            <span>{languages[value as LangKey]?.shortName}</span>
          </div>
        </Components.InputBase>
      </Components.Combobox.Target>

      <Components.Combobox.Dropdown>
        <Components.Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {languageOptions}
        </Components.Combobox.Options>
      </Components.Combobox.Dropdown>
    </Components.Combobox>
  );
};

export default LanguageSwitcher;
