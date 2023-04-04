import PersonalData from './PersonalData.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useI18n } from 'vue-i18n';

vi.mock('vue-i18n');

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

describe('PersonalData Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PersonalData, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {},
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  test('Home Component renders', () => {
    expect(wrapper).toBeTruthy();
  });
});
