import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '业务操作',
    dataIndex: 'ops',
    width: 120,
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
