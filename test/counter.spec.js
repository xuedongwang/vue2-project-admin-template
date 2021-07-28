import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Counter from '../src/components/counter/index';
import Vue from 'vue';

describe('测试 Counter.vue 组件', () => {
  // 挂载元素
  const wrapper = shallowMount(Counter);
  it('测试有显示数字的元素', () => {
    expect(wrapper.find('span.num')).to.exists;
  });
  it('测试有 add 按钮', () => {
    expect(wrapper.find('button.add-btn')).to.exists;
  });
  it('测试有 minus 按钮', () => {
    expect(wrapper.find('button.minus-btn')).to.exists;
  });
  it('测试 add 按钮增加功能', async () => {
    wrapper.find('button.add-btn').trigger('click');
    await Vue.nextTick();
    expect(wrapper.find('span.num').text()).contains('1');
  });
  it('测试 minus 按钮减少功能', async () => {
    wrapper.find('button.minus-btn').trigger('click');
    await Vue.nextTick();
    expect(wrapper.find('span.num').text()).contains('0');
  });
});
