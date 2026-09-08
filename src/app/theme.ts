import type { ThemeConfig } from 'antd';

export const clinicalTheme: ThemeConfig = {
  token: {
    colorPrimary: '#155c53', colorInfo: '#155c53', colorBgLayout: '#f5f7f8',
    colorText: '#20322f', colorTextSecondary: '#687774', borderRadius: 5,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 13, controlHeight: 28,
  },
  components: {
    Table: { headerBg: '#f6f8f7', cellPaddingBlock: 6, cellPaddingBlockSM: 5, cellPaddingInlineSM: 8 },
    Layout: { siderBg: '#ffffff', headerBg: '#ffffff' },
    Menu: { itemSelectedBg: '#e8f1ee', itemSelectedColor: '#155c53', itemBorderRadius: 5 },
  },
};
