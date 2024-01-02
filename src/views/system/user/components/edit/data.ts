import { getList as getRoleList } from '@/api/main/system/role';
import { FormSchema } from '@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['用户名，唯一'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  },
  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
  },
  {
    label: '手机号码',
    field: 'mobile',
    component: 'Input',
  },
];
