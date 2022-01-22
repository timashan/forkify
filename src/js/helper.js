import { Promise } from 'core-js';
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(reject, sec * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!res.ok) throw new Error('API error');

    const data = await res.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};
