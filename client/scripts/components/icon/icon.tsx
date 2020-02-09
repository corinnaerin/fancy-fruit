import React, { FunctionComponent } from 'react';
import ComponentUtil from '../component-util';

interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the icon, from https://material.io/tools/icons/?style=baseline
   */
  iconName: string;

  /**
   * Additional css class
   */
  className?: string;
}

/**
 * Just a shortcut for using one of the Material icons
 * See https://material.io/tools/icons/?style=baseline for a
 * list of possible values for iconName
 * @param {string} iconName
 * @param {string} className
 * @param {Props} props
 * @return {ReactElement}
 */
const Icon: FunctionComponent<Props> = ({ iconName, className = '', ...props }) => {
  return <i {...props} className={ComponentUtil.getCSSClassString(iconName, className, 'material-icons')}>{iconName}</i>;
};

export default Icon;
