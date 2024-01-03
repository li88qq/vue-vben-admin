import { FormSchema } from '@/components/Table';
import { options_openType } from '@/views/system/menu/data';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    helpMessage: ['菜单名称'],
    rules: [
      {
        required: true,
        message: '请输入名称',
      },
    ],
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
  },
  {
    field: 'href',
    label: '路径',
    component: 'Input',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'Input',
  },
  {
    label: '打开方式',
    field: 'openType',
    component: 'RadioGroup',
    componentProps: {
      options: options_openType,
    },
    defaultValue: 0,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 100,
    },
    defaultValue: 0,
  },
];
