import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { channelPage } from '@console/dev-console/integration-tests/support/pages/add-flow/channel-page';
import { createForm, sidePane } from '@console/dev-console/integration-tests/support/pages/app';
import {
  topologyPage,
  topologySidePane,
} from '@console/dev-console/integration-tests/support/pages/topology/topology-page';
import { modal } from '../../../../../integration-tests-cypress/views/modal';
import { addSubscription } from '@console/dev-console/integration-tests/support/pages/modal';

Given('user has created channel {string}', (channelName: string) => {
  channelPage.selectChannelType();
  channelPage.enterChannelName(channelName);
  createForm.clickCreate();
});

When(
  'user right clicks on the Channel {string} to open the context menu',
  (channelName: string) => {
    topologyPage.rightClickOnNode(channelName);
  },
);

When('user selects {string} from Context Menu', (menuOption: string) => {
  topologyPage.selectContextMenuAction(menuOption);
});

When('user enters Name as {string} on Add Subscription modal', (subscriberName: string) => {
  modal.modalTitleShouldContain('Add Subscription');
  addSubscription.enterSubscriberName(subscriberName);
});

When('user selects Subscriber {string} on Add Subscription modal', (subscriber: string) => {
  addSubscription.selectKnativeService(subscriber);
});

When('user clicks on Add button', () => {
  modal.submit();
});

Then(
  'user will see connection between Channel {string} and Subscriber {string}',
  (channelName: string, subscriber: string) => {
    topologyPage.clickOnNode(channelName);
    topologySidePane.verify();
    cy.byLegacyTestID(subscriber).should('be.visible');
    sidePane.close();
  },
);
