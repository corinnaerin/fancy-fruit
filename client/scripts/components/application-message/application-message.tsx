import React, { FunctionComponent, MouseEventHandler, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Message } from '../../model/message';
import { Dispatch } from 'redux';
import { ComponentCSSClasses, default as ComponentUtil } from '../component-util';
import Icon from '../icon/icon';
import styles from './application-message.css';

interface StateProps {
  /**
   * The message to display
   */
  message: Message;
}

interface DispatchProps {
  /**
   * The click handler to dismiss the message
   */
  dismiss: MouseEventHandler<HTMLElement>;
}

interface Props extends StateProps, DispatchProps {
}

/**
 * A component to display an application-wide message
 * @param {Props} props
 * @return {Element}
 */
const ApplicationMessage: FunctionComponent<Props> = ({ message, dismiss }): ReactElement => {
  const hasMessage = !!message && !!message.message;
  const type = message.type || 'info';

  const cssClasses: ComponentCSSClasses = {
    [styles.message]: true,
    [styles[type]]: true,
    [styles.hide]: !hasMessage
  };

  return (
    <section className={ComponentUtil.getConditionalCSSClassString(cssClasses)}>
      <Icon iconName={type} className={styles.icon} />
      <span>{message && message.message}</span>
      <Icon iconName='clear' className={styles.dismiss} onClick={dismiss} />
    </section>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    dismiss: (): void => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      });
    }
  };
};

const mapStateToProps = ({ message }: StateProps): StateProps => {
  return {
    message: message || {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMessage);
