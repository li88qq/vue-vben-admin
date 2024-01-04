import { FormSchema } from '@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    helpMessage: ['名称，唯一'],
    rules: [
      {
        required: true,
        message: '请输入名称',
      },
    ],
  },
];
