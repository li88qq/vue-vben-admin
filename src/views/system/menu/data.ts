import { BasicColumn, FormSchema } from '@/components/Table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

// 打开方式
export const options_openType = [
  { value: 0, label: '直接打开', color: 'green' },
  { value: 1, label: '新窗口打开', color: 'blue' },
];

// 打开方式
export const render_openType = (value: number) => {
  const openType = options_openType.find((item) => item.value === value);
  if (openType) {
    return h(Tag, { color: openType.color }, () => openType.label);
  }
  return '';
};

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '路径',
    dataIndex: 'href',
  },
  {
    title: '图标',
    dataIndex: 'icon',
  },
  {
    title: '打开方式',
    dataIndex: 'openType',
    customRender: ({ text }) => render_openType(text),
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
