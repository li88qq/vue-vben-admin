import { BasicColumn, FormSchema } from '@/components/Table';
import { timestampToTime } from '@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 160,
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    customRender: ({ text }) => timestampToTime(text),
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleId',
    label: '角色',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'mobile',
    label: '手机号码',
    component: 'Input',
    colProps: { span: 6 },
  },
];
