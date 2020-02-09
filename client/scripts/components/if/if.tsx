import { FunctionComponent, ReactElement } from 'react';

interface Props {
  /**
   * Whether to render the children
   */
  condition: boolean;

  /*
   * A render function for the child components that should be rendered if the condition is true
   * Using a function for this instead of component.children, because of the way React optimizes its rendering
   * If you just wrap a component like this around the children, the children will still be rendered, but not shown,
   * which can additionally cause unexpected errors if required props are undefined, etc.
   */
  render: () => ReactElement;

  /**
   * An optional function to render in the else condition
   */
  elseRender?: () => ReactElement;
}

/**
 * A simple but extremely useful utility component to gate content
 * based on a conditional
 * @param {Props} props
 * @return {ReactElement}
 */
const If: FunctionComponent<Props> = ({ condition, render, elseRender }) => {
  if (condition) {
    return render();
  } else if (elseRender) {
    return elseRender();
  }

  return null;
};

export default If;
