import * as Types from '@/modules/apartmentSearch/types';

export declare namespace IBase {
  interface Owner {
    fullName: string;
    phone_number: string;
  }

  interface Amenities {
    wifi: boolean;
    conditioner: boolean;
    furniture: boolean;
    kitchen: boolean;
    washing_machine: boolean;
  }

  interface AmenityItem {
    label: string;
    icon: any;
  }

  interface IProps {
    values: Types.IEntity.Apartment;
    layout: 'vertical' | 'horizontal';
    onClick?: () => void;
    buttonClick?: () => void;
  }
}

export declare namespace IUse {}
