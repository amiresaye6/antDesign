import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

/**
 * GoBackButton - A reusable component that navigates to the previous route
 * 
 * @param {Object} props
 * @param {string} [props.text] - Optional text to display next to the icon
 * @param {string} [props.tooltipText] - Optional tooltip text
 * @param {string} [props.buttonType] - Ant Design Button type (default, primary, etc.)
 * @param {string} [props.size] - Button size (small, middle, large)
 * @param {Object} [props.style] - Additional inline styles
 * @param {string} [props.fallbackPath] - Fallback path if no history is available
 * @param {Function} [props.beforeNavigate] - Function to run before navigation
 */
const GoBackButton = ({
  text,
  tooltipText = 'Go Back',
  buttonType = 'default',
  size = 'middle',
  style = {},
  fallbackPath = '/',
  beforeNavigate = null,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Run the beforeNavigate function if provided
    if (beforeNavigate && typeof beforeNavigate === 'function') {
      beforeNavigate();
    }

    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history is available, navigate to the fallback path
      navigate(fallbackPath);
    }
  };

  // Render the button with or without text
  const renderButton = () => (
    <Button
      type={buttonType}
      size={size}
      icon={<ArrowLeftOutlined />}
      onClick={handleGoBack}
      style={style}
    >
      {text}
    </Button>
  );

  // Return the button with tooltip if tooltipText is provided
  return tooltipText && !text ? (
    <Tooltip title={tooltipText}>
      {renderButton()}
    </Tooltip>
  ) : (
    renderButton()
  );
};

export default GoBackButton;