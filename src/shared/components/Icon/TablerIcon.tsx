// src/utils/iconMap.ts
import {
  IconCar,
  IconDoor,
  IconSwimming,
  IconDeviceMobile,
  IconTrees,
  IconHorseToy,
  IconDroplet,
  IconSofa,
  IconMicrophone,
  IconBolt,
  IconBarbell,
  IconFlame,
  IconWash,
  IconDeviceTv,
  IconCamera,
  IconBed,
  IconBooks,
  IconCoffee,
  IconSnowflake,
  IconElevator,
  IconShield,
  IconBox,
  IconWind,
  IconFridge,
  IconTable,
  IconChairDirector,
  IconDeviceTvOld,
  IconBuilding,
  IconBread,
  IconAlertTriangle,
  IconBath,
  IconWifi,
  IconQuestionMark,
  IconWorld,
  IconMan,
  IconWoman,
  IconHeartHandshake,
  IconUsersGroup,
  IconUser,
  IconHeart,
  IconUsers
} from '@tabler/icons-react';

// Map of all icons used in your app
export const iconMap: Record<string, React.ComponentType<any>> = {
  IconCar,
  IconDoor,
  IconSwimming,
  IconDeviceMobile,
  IconTrees,
  IconHorseToy,
  IconDroplet,
  IconSofa,
  IconMicrophone,
  IconBolt,
  IconBarbell,
  IconFlame,
  IconWash,
  IconDeviceTv,
  IconCamera,
  IconBed,
  IconBooks,
  IconCoffee,
  IconSnowflake,
  IconElevator,
  IconShield,
  IconBox,
  IconWind,
  IconFridge,
  IconTable,
  IconChairDirector,
  IconDeviceTvOld,
  IconBuilding,
  IconBread,
  IconAlertTriangle,
  IconBath,
  IconWifi,
  IconWorld,
  IconMan,
  IconWoman,
  IconHeartHandshake,
  IconUsersGroup,
  IconUser,
  IconHeart,
  IconUsers
};

export const FallbackIcon = IconQuestionMark;

// Updated TablerIcon component
import React from 'react';

interface TablerIconProps {
  /** Icon name, e.g. "IconTrees" or "ti ti-trees" */
  name: string;
  /** Size of the icon (default 24) */
  size?: number;
  /** Color of the icon */
  color?: string;
  /** Additional className */
  className?: string;
}

/**
 * Renders a Tabler Icon dynamically by its name.
 * Automatically converts strings like "ti ti-trees" → "IconTrees".
 * Now uses a pre-defined icon map for optimal bundle size.
 */
export const TablerIcon: React.FC<TablerIconProps> = ({ name, size = 24, color = 'currentColor', className }) => {
  // Normalize name, e.g. "ti ti-trees" → "IconTrees"
  const normalizedName = name.startsWith('Icon')
    ? name
    : 'Icon' +
      name
        .replace(/^ti ti-/, '') // remove tabler prefix
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

  // Get icon from the map
  const IconComponent = iconMap[normalizedName] || FallbackIcon;

  return <IconComponent size={size} color={color} className={className} />;
};
