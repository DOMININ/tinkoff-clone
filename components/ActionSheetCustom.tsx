import React, { useEffect, useRef } from 'react';
import ActionSheet from 'react-native-actionsheet';

interface Props {
  title: string;
  options: string[];
  selectedIndex: (index: number) => void;
  visible: boolean;
}

export const ActionSheetCustom = ({ title, options, selectedIndex, visible = false }: Props) => {
  const refActionSheet = useRef<ActionSheet>(null);

  const showActionSheet = () => {
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  };

  useEffect(() => {
    visible && showActionSheet();
  }, [visible]);

  return (
    <ActionSheet
      ref={refActionSheet}
      title={title}
      options={options}
      cancelButtonIndex={3}
      destructiveButtonIndex={2}
      onPress={(index) => selectedIndex(index)}
    />
  );
};
