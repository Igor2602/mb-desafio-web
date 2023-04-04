import ReviewInformations from './ReviewInformations.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, test, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useI18n } from 'vue-i18n';
import { useSnackbar } from 'vue3-snackbar';

const snackbar = useSnackbar();

snackbar.add({
  type: 'success',
  text: 'Teste',
});

vi.mock('vue-i18n');

useI18n.mockReturnValue({
  t: (tKey) => tKey,
});

describe('ReviewInformations Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(ReviewInformations, {
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
