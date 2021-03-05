import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import {
  operators,
  switchPerspective,
} from '@console/dev-console/integration-tests/support/constants/global';
import { perspective } from '@console/dev-console/integration-tests/support/pages/app';
import { operatorsPO } from '@console/dev-console/integration-tests/support/pageObjects/operators-po';
import { installOperator } from '@console/dev-console/integration-tests/support/pages/functions/installOperatorOnCluster';
import { operatorsPage } from '@console/dev-console/integration-tests/support/pages/operators-page';
import {
  createKnativeEventing,
  createKnativeServing,
} from '../../pages/functions/knativeSubscriptions';

Given('user has installed OpenShift Serverless Operator', () => {
  perspective.switchTo(switchPerspective.Administrator);
  operatorsPage.navigateToInstallOperatorsPage();
  cy.get(operatorsPO.installOperators.search)
    .should('be.visible')
    .clear()
    .type(operators.ServerlessOperator);
  cy.get('body', {
    timeout: 50000,
  }).then(($ele) => {
    if ($ele.find(operatorsPO.installOperators.noOperatorsFound)) {
      installOperator(operators.ServerlessOperator);
      createKnativeEventing();
      createKnativeServing();
    } else {
      cy.log('Serverless operator is installed in cluster');
    }
  });
});

Given('user has installed OpenShift Serverless Operator using CLI', () => {
  cy.exec(`oc apply -f installation-yamls/createKnativeServing-CR.yaml`, { timeout: 50000 })
    .its('stdout')
    .should('contain', 'subscription.operators.coreos.com/serverless-operator created');
});

When('user has created Knative Serving CR using CLI', () => {
  cy.exec(`oc apply -f testData/installation-yamls/createKnativeServing-CR.yaml`, {
    timeout: 10000,
  })
    .its('stdout')
    .should('contain', 'knativeserving.operator.knative.dev/knative-serving created');
});

When('user has created Knative Eventing CR using CLI', () => {
  cy.exec(`oc apply -f testData/installation-yamls/createKnativeEventing-CR.yaml`, {
    timeout: 10000,
  })
    .its('stdout')
    .should('contain', 'knativeeventing.operator.knative.dev/knative-eventing created');
});
