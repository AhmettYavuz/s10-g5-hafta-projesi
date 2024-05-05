import React from 'react';

import { beforeEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/server';
import 'mutationobserver-shim';

import App from '../App';
import { myStore } from '../store/store.js';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

const isStoreFileExists = fs.existsSync(
  path.resolve(__dirname, '../store/store.js'),
  'utf8'
);

const storeFile = isStoreFileExists
  ? fs
      .readFileSync(path.resolve(__dirname, '../store/store.js'), 'utf8')
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';

const appFile = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
});
beforeEach(() => {
  render(
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

test('store/actions/index.js dosyası oluşturulmuş', () => {
  const isActionsFileExists = fs.existsSync(
    path.resolve(__dirname, '../store/actions/index.js'),
    'utf8'
  );
  expect(isActionsFileExists).toBe(true);
});

test('Tüm notlar sayfası açıldığında kayıtlı notları getiriyor.', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Tüm Notlar'));
  await screen.findByTestId('post-item');
});

test('Yeni not ekleniyor', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Yeni Not'));
  await user.type(screen.getByTestId('input1'), 'Bugün güzel geçti1.');
  await user.type(screen.getByTestId('input2'), 'Bugün güzel geçti2.');
  await user.type(screen.getByTestId('input3'), 'Bugün güzel geçti3.');
  await user.click(screen.getByText('Ekle'));
  expect(screen.queryAllByTestId('post-item')).toHaveLength(2);
});

test('react-toastify App.jsxde eklenmiş', () => {
  expect(appFile).toContain('<ToastContainer/>');
});

test('react-toastify css dosyası unutulmamış', () => {
  expect(appFile).toContain('react-toastify/dist/ReactToastify.css');
});

test('Yeni not eklendiğinde doğru metin ile toast mesajı görüntüleniyor', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Yeni Not'));
  await user.type(screen.getByTestId('input1'), 'Bugün güzel geçti1.');
  await user.type(screen.getByTestId('input2'), 'Bugün güzel geçti2.');
  await user.type(screen.getByTestId('input3'), 'Bugün güzel geçti3.');
  await user.click(screen.getByText('Ekle'));
  await screen.findByText(
    'Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...'
  );
});

test('Not ekledikten sonra LocalStorageı güncelliyor', async () => {
  localStorage.clear();
  const user = userEvent.setup();
  await user.click(screen.getByText('Yeni Not'));
  await user.type(screen.getByTestId('input1'), 'Bugün güzel geçti1.');
  await user.type(screen.getByTestId('input2'), 'Bugün güzel geçti2.');
  await user.type(screen.getByTestId('input3'), 'Bugün güzel geçti3.');
  await user.click(screen.getByText('Ekle'));
  await screen.findByText(
    'Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...'
  );
  expect(JSON.parse(localStorage.getItem('s10d5')).notlar).toHaveLength(4);
});

test('idsi 1 olan mesaj silinince server hata dönüyor. Hata mesajı doğru metin ile ekranda görünüyor.', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Tüm Notlar'));
  await user.click(screen.getByTestId('item-1'));
  await screen.findByText('Bir hata oluştu!');
});

test('Bu notu sil butonu ile not siliniyor', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Tüm Notlar'));
  await user.click(screen.getAllByText('Bu notu sil')[1]);
  expect(screen.queryAllByTestId('post-item')).toHaveLength(3);
});

test('No silinince doğru metin ile toast mesajı görüntüleniyor', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText('Tüm Notlar'));
  await user.click(screen.getAllByText('Bu notu sil')[1]);
  await screen.findByText('Notunuz silindi...');
});

test('Not silindikten sonra LocalStorageı güncelliyor', async () => {
  localStorage.clear();
  const user = userEvent.setup();
  await user.click(screen.getByText('Tüm Notlar'));
  await user.click(screen.getAllByText('Bu notu sil')[1]);
  await screen.findByText('Notunuz silindi...');
  expect(JSON.parse(localStorage.getItem('s10d5')).notlar).toHaveLength(1);
});
