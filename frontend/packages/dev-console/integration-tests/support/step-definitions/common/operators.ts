import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { operatorsPage, operatorsObj } from '../../pages/operators-page';
import { operators, switchPerspective, devNavigationMenu } from '../../constants/global';
import { projectNameSpace, perspective, naviagteTo } from '../../pages/app';
import { addPage } from '../../pages/add-flow/add-page';
import { eventSourcesPage } from '../../pages/add-flow/eventSource-page';
import { detailsPage } from '../../../../../integration-tests-cypress/views/details-page';
import { modal } from '../../../../../integration-tests-cypress/views/modal';
import { nav } from '../../../../../integration-tests-cypress/views/nav';
import { guidedTour } from '../../../../../integration-tests-cypress/views/guided-tour';

Given('user is at Operator Hub page with the header name {string}', (headerName) => {
  operatorsPage.navigateToOperaotorHubPage();
  detailsPage.titleShouldContain(headerName);
});

When('user searches for {string}', (operatorName: operators) => {
  operatorsPage.searchOperator(operatorName);
});

When('user executes commands from cli as {string}', (command: string) => {
  cy.exec(command);
});

Then('user will be redirected to Event Sources page', () => {
  detailsPage.titleShouldContain('Event Sources');
});

Then('GitHub Source is displayed in types section', () => {
  eventSourcesPage.verifyEventSourceType('Git Hub Source');
});

When('user clicks OpenShift Pipelines Operator card on Operator Hub page', () => {
  operatorsPage.selectOperator(operators.pipelineOperator);
});

When('user clicks install button present on the right side bar', () => {
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
});

Then('OpenShift Pipeline operator subscription page will be displayed', () => {
  operatorsPage.verifySubscriptionPage('OpenShift Pipelines Operator');
  operatorsPage.clickOnCancel();
});

Given('user is at OpenShift Pipeline Operator subscription page', () => {
  operatorsPage.navigateToOperaotorHubPage();
  operatorsPage.searchOperator('OpenShift Pipelines Operator');
  operatorsPage.selectOperator(operators.pipelineOperator);
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
  operatorsPage.verifySubscriptionPage('OpenShift Pipelines Operator');
});

When('user installs the pipeline operator with default values', () => {
  operatorsPage.installOperator();
});

Then('page will be redirected to Installed operators', () => {
  detailsPage.titleShouldContain('Installed Operators');
});

Then('Installed operators page will contain {string}', (operatorName: string) => {
  operatorsPage.verifyInstalledOperator(operatorName);
});

Then('user will see a modal with title {string}', (operatorName: string) => {
  cy.get('article h1').should('contain.text', operatorName);
});

Then('user will see a View Operator button', () => {
  cy.get('[role="progressbar"]', { timeout: 60000 }).should('not.be.visible');
  cy.byButtonText('View Operator').should('be.visible');
});

Then('user will see serverless option on left side navigation menu', () => {
  operatorsPage.verifyOperatorInNavigationMenu('Serverless');
});

Given('user is at OpenShift Serverless Operator subscription page', () => {
  operatorsPage.navigateToOperaotorHubPage();
  operatorsPage.searchOperator('OpenShift Serverless Operator');
  operatorsPage.selectOperator(operators.serverlessOperator);
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
  operatorsPage.verifySubscriptionPage('OpenShift Serverless Operator');
});

When('user installs the OpenShift Serverless operator with default values', () => {
  operatorsPage.installOperator();
});

Given('cluster is installed with knative serverless operator', () => {
  operatorsPage.verifyOperatorInNavigationMenu('Serverless');
});

Given('user is on the knative-eventing namespace', () => {
  projectNameSpace.selectProject('knative-eventing');
});

Given('cluster is installed with knative serverless and eventing operators', () => {
  operatorsPage.verifyOperatorInNavigationMenu('Serverless');
  operatorsPage.navigateToInstalloperatorsPage();
  operatorsPage.verifyInstalledOperator('OpenShift Serverless Operator');
  cy.get('a[title="knativeeventings.operator.knative.dev"]').should('be.visible');
});

Given('user is at Eclipse che Operator subscription page', () => {
  operatorsPage.navigateToOperaotorHubPage();
  operatorsPage.searchOperator('Eclipse Che');
  operatorsPage.selectOperator(operators.eclipseCheOperator);
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
  operatorsPage.verifySubscriptionPage('Eclipse Che');
});

When('user uninstalls the pipeline operator from right side bar', () => {
  operatorsPage.verifySiedPane();
  operatorsPage.clickUninstallOnSidePane();
});

When('user clicks unistall button present in modal with header message Uninstall Operator?', () => {
  modal.modalTitleShouldContain('Uninstall Operator?');
  cy.get(operatorsObj.uninstallPopup.uninstall).click();
});

When('user navigates to installed operators page in Admin perspective', () => {
  operatorsPage.navigateToInstalloperatorsPage();
});

When('user clicks knative eventing provided api pressent in knative serverless operator', () => {
  cy.get('a[title="knativeeventings.operator.knative.dev"]').click();
});

When('user clicks Create knative Eventing button present in knative Eventing tab', () => {
  detailsPage.titleShouldContain('knative Eventings');
  cy.get('[data-test="yaml-create"]').click();
});

When('user clicks create button', () => {
  cy.get('button[type="submit"]').click();
});

When('user search and installs the knative Camel operator with default values', () => {
  operatorsPage.searchOperator('OpenShift Serverless Operator');
  operatorsPage.selectOperator(operators.knativeCamelOperator);
  operatorsPage.verifySiedPane();
  operatorsPage.clickInstallOnSidePane();
  operatorsPage.verifySubscriptionPage('knative Apache Camel Operator');
  operatorsPage.installOperator();
});

Given('user has installed OpenShift Serverless Operator', () => {
  perspective.switchTo(switchPerspective.Administrator);
  nav.sidenav.switcher.shouldHaveText('Administrator');
  operatorsPage.verifyOperatorInNavigationMenu('Serverless');
});

Given('user has installed ElasticSearch Operator provided by Red Hat', () => {
  perspective.switchTo(switchPerspective.Administrator);
  nav.sidenav.switcher.shouldHaveText('Administrator');
  operatorsPage.verifyInstalledOperator('ElasticsearchOperator');
});

Given('user has installed Red Hat OpenShift Jaeger Operator', () => {
  perspective.switchTo(switchPerspective.Administrator);
  nav.sidenav.switcher.shouldHaveText('Administrator');
  operatorsPage.verifyInstalledOperator('Jaeger');
});

Given('user has installed Kiali Operator provided by Red Hat', () => {
  perspective.switchTo(switchPerspective.Administrator);
  nav.sidenav.switcher.shouldHaveText('Administrator');
  operatorsPage.verifyInstalledOperator('Kiali');
});

Given('user has installed Red Hat OpenShift Service Mesh Operator', () => {
  perspective.switchTo(switchPerspective.Administrator);
  nav.sidenav.switcher.shouldHaveText('Administrator');
  operatorsPage.verifyInstalledOperator('ServiceMesh');
});

When('user installs the Eclipse che operator with default values', () => {
  operatorsPage.installOperator();
});

Then('Event sources card display in +Add page in dev perspective', () => {
  perspective.switchTo(switchPerspective.Developer);
  guidedTour.close();
  naviagteTo(devNavigationMenu.Add);
  addPage.verifyCard('Event Source');
});

Given('user has installed OpenShift Pipelines operator', () => {
  perspective.switchTo(switchPerspective.Developer);
  guidedTour.close();
  nav.sidenav.switcher.shouldHaveText('Developer');
  cy.get('#page-sidebar').then(($navMenu) => {
    if ($navMenu.find('[data-test-id="pipeline-header"]').length) {
      cy.log('pipeline operator is installed');
    }
  });
});

Then('user will be redirected to Installed operators page', () => {
  detailsPage.titleShouldContain('Installed Operators');
});

Then('Installed operators page will contain {string}', (operatorName: string) => {
  operatorsPage.verifyOperatoNotAvailable(operatorName);
});

Then('Installed operators page will not contain {string}', (operatorName: string) => {
  operatorsPage.verifyOperatoNotAvailable(operatorName);
});

Given('user executed command {string}', () => {
  cy.exec(
    'oc apply -f https://gist.githubusercontent.com/nikhil-thomas/f6069b00b0e3b0359ae1cbdb929a04d6/raw/7b19be0c52355d041bf3d6a883db06b578f15f0d/openshift-pipelines-early-release-catalog-source.yaml',
  );
});
