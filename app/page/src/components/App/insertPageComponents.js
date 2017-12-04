import React from 'react';
import { render } from 'react-dom';
import {
  checkIfUsernameVerifiedMessage, getBalanceForComponentsMessage, getGoldForComponentsMessage
} from '../../../../messages/pageActionsMessages';
import UserVerified from '../UserVerified/UserVerified';
import Tip from '../Tip/Tip';
import BuyGold from '../BuyGold/BuyGold';
import TipsEth from '../TipsEth/TipsEth';
import ComponentMonths from '../ComponentMonths/ComponentMonths';

const postConfig = {
  targetElem: '.sitetable.linklisting .thing:not(.added) .flat-list.buttons',
  type: 'post',
  authorWrapper: '.sitetable.linklisting .thing:not(.added) .tagline',
  mapFunc: (i, e) => ($(e).find('.author').text()),
  authorIdWrapper: '.sitetable.linklisting',
  typeWrapper: '.sitetable.linklisting .thing:not(.added)'
};

const commentConfig = {
  targetElem: ".commentarea .comment:not(.added) .flat-list:contains('permalink')",
  type: 'comment',
  authorWrapper: '.commentarea .comment:not(.added) .tagline .author',
  mapFunc: (i, el) => (el.textContent),
  authorIdWrapper: '.commentarea',
  typeWrapper: '.commentarea .comment:not(.added)'
};

const insertComponentIntoPage = (config) => {
  const { targetElem, type, authorWrapper, mapFunc, authorIdWrapper, typeWrapper } = config;
  const elem = $(targetElem);

  elem.append(`
    <li class="extend-tip-${type}"></li>
    <li class="extend-gold-${type}"></li>
    <li class="extend-verified-${type}"></li>
  `);

  const authors = $(authorWrapper).map(mapFunc);
  const idElements = authors.map((key, val) => ($(authorIdWrapper).find(`[data-author='${val}']`)));
  const ids = idElements.map((key, val) => val.attr('id').substring(6));

  const tipDivs = elem.find(`.extend-tip-${type}`).toArray();
  const goldDivs = elem.find(`.extend-gold-${type}`).toArray();
  const verifiedDivs = elem.find(`.extend-verified-${type}`).toArray();

  authors.each((i, author) => { checkIfUsernameVerifiedMessage(author, i, type); });

  $(typeWrapper).addClass('added');

  return { tipDivs, goldDivs, verifiedDivs, authors, ids };
};

const renderNotVerified = (author, id, targetForTips, targetForGold) => {
  render(<Tip author={author} id={id} isVerified={false} />, targetForTips);
  render(<BuyGold author={author} id={id} />, targetForGold);
  return false;
};

const renderVerified = (author, id, targetForTips, targetForGold, targetForVerified) => {
  render(<UserVerified isVerified />, targetForVerified);
  return renderNotVerified(author, id, targetForTips, targetForGold);
};

/**
 * Formats data needed to render tip, gold and verified user components
 *
 * @param {Object} data
 * @param {Number} index
 * @return {Object}
 */
const getValuesForRender = (data, index) => {
  const author = data.authors[index];
  const id = data.ids[index];
  const targetForTips = data.tipDivs[index];
  const targetForGold = data.goldDivs[index];
  const targetForVerified = data.verifiedDivs[index];

  return { author, id, targetForTips, targetForGold, targetForVerified };
};

/**
 * Handle response from background for the checkIfUsernameVerified message,
 * renders the tip and gold icons
 *
 * @param {Object} message
 * @param {Object} postData - { author, id, targetForTips, targetForGold, targetForVerified }
 * @param {Object} commentData - { author, id, targetForTips, targetForGold, targetForVerified }
 */
const handleCheckIfUsernameVerified = (message, postData, commentData) => {
  let dataForRender = null;
  const { index, isVerified, type } = message.payload;

  if (type === 'post') dataForRender = postData;
  if (type === 'comment') dataForRender = commentData;

  if (dataForRender.tipDivs.length === 0) return false;

  const { author, id, targetForTips, targetForGold, targetForVerified } = getValuesForRender(dataForRender, index);

  if (!isVerified) return renderNotVerified(author, id, targetForTips, targetForGold);

  return renderVerified(author, id, targetForTips, targetForGold, targetForVerified);
};

/**
 * Handle response from background for the getBalanceForComponents message,
 * inserts the amount of eth the post/comment received into the dom
 *
 * @param {Object} message
 */
const handleGetBalanceForComponents = (message) => {
  message.payload.forEach((data) => {
    const parent = $($(`#thing_${data.id}`).find('[class^="extend-tip"]').parent()[0]);

    parent.append('<li class="extend-tip-val" />');

    render(<TipsEth val={data.val} />, parent.find('.extend-tip-val')[0]);
  });
};

/**
 * Handle response from background for the getBalanceForComponents message,
 * inserts the amount of eth the post/comment received into the dom
 *
 * @param {Object} message
 */
const handleGetGoldForComponents = (message) => {
  message.payload.forEach((data) => {
    const parent = $($(`#thing_${data.id}`).find('.tagline')[0]);

    parent.append('<span class="extend-months-val" />');

    render(<ComponentMonths months={data.months} />, parent.find('.extend-months-val')[0]);
  });
};

/**
 * Inserts page components into the DOM and listens to incoming messages from the background
 */
export default () => {
  const postData = insertComponentIntoPage(postConfig);
  const commentData = insertComponentIntoPage(commentConfig);

  const postAndCommentIds = [...postData.ids, ...commentData.ids];

  getBalanceForComponentsMessage(postAndCommentIds);
  getGoldForComponentsMessage(postAndCommentIds);

  const cb = (message) => {
    if (message.type === 'checkIfUsernameVerified') handleCheckIfUsernameVerified(message, postData, commentData);
    if (message.type === 'getBalanceForComponents') handleGetBalanceForComponents(message);
    if (message.type === 'getGoldForComponents') handleGetGoldForComponents(message);
  };

  chrome.runtime.onMessage.removeListener(cb);
  chrome.runtime.onMessage.addListener(cb);
};
