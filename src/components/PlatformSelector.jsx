// components/PlatformSelector.js
import React from 'react';
import { Checkbox, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const PlatformSelector = ({ platforms, selectedPlatforms, onChange }) => {
  const { t } = useTranslation('postsDashboard');
  
  const handleChange = (checkedValues) => {
    onChange(checkedValues);
  };

  return (
    <Checkbox.Group value={selectedPlatforms} onChange={handleChange}>
      <Space wrap>
        {platforms.map(platform => (
          <Tooltip key={platform.key} title={t(`platforms.${platform.key}.tooltip`)}>
            <Checkbox value={platform.key}>
              <Space>
                {platform.icon}
                {platform.name}
              </Space>
            </Checkbox>
          </Tooltip>
        ))}
      </Space>
    </Checkbox.Group>
  );
};

export default PlatformSelector;