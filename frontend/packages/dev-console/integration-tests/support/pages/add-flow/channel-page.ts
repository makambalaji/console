import { channelPO } from '../../pageObjects/add-flow-po';

export const channelPage = {
  selectChannelType: (channelType: string = 'InMemoryChannel') => {
    cy.selectByDropDownText(channelPO.channelType, channelType);
  },
  enterChannelName: (channelName: string) => cy.get(channelPO.channelName).type(channelName),
};
