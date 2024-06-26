import { ActionIcon, Icon } from '@lobehub/ui';
import { Popover } from 'antd';
import { useTheme } from 'antd-style';
import { Monitor, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Menu, { type MenuProps } from '@/components/Menu';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

const themeIcons = {
  auto: Monitor,
  dark: Moon,
  light: Sun,
};

const ThemeButton = memo(() => {
  const theme = useTheme();
  const [themeMode, switchThemeMode] = useUserStore((s) => [
    settingsSelectors.currentSettings(s).themeMode,
    s.switchThemeMode,
  ]);

  const { t } = useTranslation('setting');

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={themeIcons.auto} />,
        key: 'auto',
        label: t('settingTheme.themeMode.auto'),
        onClick: () => switchThemeMode('auto'),
      },
      {
        icon: <Icon icon={themeIcons.light} />,
        key: 'light',
        label: t('settingTheme.themeMode.light'),
        onClick: () => switchThemeMode('light'),
      },
      {
        icon: <Icon icon={themeIcons.dark} />,
        key: 'dark',
        label: t('settingTheme.themeMode.dark'),
        onClick: () => switchThemeMode('dark'),
      },
    ],
    [t],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} selectable selectedKeys={[themeMode]} />}
      overlayInnerStyle={{
        padding: 0,
      }}
      placement={'right'}
      trigger={['click', 'hover']}
    >
      <ActionIcon
        icon={themeIcons[themeMode]}
        size={{ blockSize: 32, fontSize: 16 }}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
});

export default ThemeButton;
