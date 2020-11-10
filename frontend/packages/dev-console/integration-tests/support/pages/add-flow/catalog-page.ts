import { addPage } from './add-page';
import { addOptions, caatalogCards, catalogTypes } from '../../constants/add';
import { app } from '../app';
import { topologyPage } from '../topology-page';
import { detailsPage } from '../../../../../integration-tests-cypress/views/details-page';

export const catalogPageObj = {
  search: 'input[placeholder="Filter by keyword..."]',
  card: 'a.pf-c-card',
  groupBy: '[data-test-id="dropdown-button"]',
  cardType: 'span.pf-c-badge',
  create: 'button[type="submit"]',
  cancel: '[data-test-id="reset-button"]',
  catalogTypes: {
    operatorBacked: '[data-test="kind-cluster-service-version"]',
    helmCharts: '[data-test="kind-helm-chart"]',
    builderImage: '[data-test="kind-image-stream"]',
    template: '[data-test="kind-template"]',
    serviceClass: '[data-test="kind-cluster-service-class"]',
  },
  cards: {
    mariaDBTemplate: '[data-test="Template-mariadb-persistent"]',
    phpCakeTemplate: '[data-test="Template-cakephp-mysql-persistent"]',
    nodeJsBuilderImage: '[data-test="ImageStream-nodejs"]',
  },
  sidePane: {
    dialog: '[role="dialog"]',
    instantiateTemplate: '[role="dialog"] .pf-m-primary',
    create: 'a[title="Create"]',
    installHelmChart: 'a[title="Install Helm Chart"]',
    createApplication: 'a[title="Create Application"]',
  },
  mariaDBTemplate: {
    namespace: '#namespace',
    title: 'h1.co-m-pane__heading',
    memoryLimit: '#MEMORY_LIMIT',
    imageSrreamNameSpace: '#NAMESPACE',
    databaseServiceName: '#DATABASE_SERVICE_NAME',
    mariaDBConnectionUserName: '#MYSQL_USER',
  },
  createknativeServing: {
    logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
    name: '#root_metadata_name',
    labels: 'input[placeholder="app=frontend"]',
  },
  installHelmChart: {
    logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
    install: '[data-test-id="submit-button"]',
    releaseName: '#form-input-releaseName-field',
    yamlView: '#form-radiobutton-editorType-yaml-field',
    formView: '#form-radiobutton-editorType-form-field',
    cancel: '[data-test-id="reset-button"]',
  },
  s2I: {
    gitRepoUrl: '[data-test-id="git-form-input-url"]',
    builderImageVersion: '#form-dropdown-image-tag-field',
    appName: '[data-test-id="application-form-app-input"]',
    name: '[data-test-id="application-form-app-name"]',
    resourceTypes: {
      deployment: '#form-radiobutton-resources-kubernetes-field',
      deploymentConfig: '#form-radiobutton-resources-openshift-field',
      knative: '#form-radiobutton-resources-knative-field',
    },
    addPipeline: {
      pipelineCheckBox: '#form-checkbox-pipeline-enabled-field',
    },
    createRoute: '#form-checkbox-route-create-field',
  },
};

export const catalogPage = {
  verifyTitle: () => detailsPage.titleShouldContain('Developer Catalog'),
  isCheckBoxSelected: (type: string) => cy.get(`input[title="${type}"]`).should('be.checked'),
  isCardsDisplayed: () => cy.get(catalogPageObj.card).should('be.visible'),
  search: (keyword: string) =>
    cy
      .get(catalogPageObj.search)
      .clear()
      .type(keyword),
  verifyDialog: () => cy.get(catalogPageObj.sidePane.dialog).should('be.visible'),
  verifyInstallHelmChartPage: () =>
    cy
      .get('form h1')
      .eq(0)
      .should('have.text', 'Install Helm Chart'),
  clickButtonOnCatalogPageSidePane: () => {
    catalogPage.verifyDialog();
    cy.get(catalogPageObj.sidePane.instantiateTemplate).click({ force: true });
  },
  clickOnCancelButton: () => cy.byButtonText('Cancel').click(),
  selectCatalogTypeCheckBox: (type: string | catalogTypes) => {
    switch (type) {
      case catalogTypes.OperatorBacked:
      case 'Operator Backed': {
        cy.get(catalogPageObj.catalogTypes.operatorBacked).check();
        break;
      }
      case catalogTypes.HelmCharts:
      case 'Helm Charts': {
        cy.get(catalogPageObj.catalogTypes.helmCharts).check();
        break;
      }
      case catalogTypes.BuilderImage:
      case 'Builder Image': {
        cy.get(catalogPageObj.catalogTypes.builderImage).check();
        break;
      }
      case catalogTypes.Template:
      case 'Template': {
        cy.get(catalogPageObj.catalogTypes.template).check();
        break;
      }
      case catalogTypes.ServiceClass:
      case 'Service Class': {
        cy.get(catalogPageObj.catalogTypes.serviceClass).check();
        break;
      }
      default: {
        throw new Error('Card is not available in Catalog');
      }
    }
  },
  selectknativeServingCard: () =>
    cy
      .get('div.catalog-tile-pf-title', { timeout: 40000 })
      .contains('Knative Serving')
      .click(),
  selectHelmChartCard: (cardName: string) =>
    cy
      .get('a div.catalog-tile-pf-title')
      .contains(cardName)
      .click(),
  clickOnInstallButton: () => {
    cy.get(catalogPageObj.installHelmChart.install).click();
    app.waitForLoad(40000);
  },
  enterReleaseName: (releaseName: string) =>
    cy
      .get(catalogPageObj.installHelmChart.releaseName)
      .clear()
      .type(releaseName),
  createHelmChartFromAddPage: (
    releaseName: string = 'nodejs-ex-k',
    helmChartName: string = 'Nodejs Ex K v0.2.1',
  ) => {
    addPage.verifyCard('Helm Chart');
    addPage.selectCardFromOptions(addOptions.HelmChart);
    catalogPage.verifyTitle();
    catalogPage.isCardsDisplayed();
    catalogPage.search(helmChartName);
    catalogPage.selectHelmChartCard(helmChartName);
    catalogPage.verifyDialog();
    catalogPage.clickButtonOnCatalogPageSidePane();
    catalogPage.verifyInstallHelmChartPage();
    catalogPage.enterReleaseName(releaseName);
    catalogPage.clickOnInstallButton();
    topologyPage.verifyWorkloadInTopologyPage(releaseName);
  },
  selectCardInCatalog: (card: caatalogCards | string) => {
    cy.byLegacyTestID('perspective-switcher-toggle').click();
    switch (card) {
      case caatalogCards.mariaDB:
      case 'MariaDB': {
        cy.get(catalogPageObj.cards.mariaDBTemplate).click();
        break;
      }
      case caatalogCards.cakePhp:
      case 'CakePHP + MySQL': {
        cy.get(catalogPageObj.cards.phpCakeTemplate).click();
        break;
      }
      case caatalogCards.nodeJs:
      case 'Node.js': {
        cy.get(catalogPageObj.cards.nodeJsBuilderImage).click();
        break;
      }
      default: {
        throw new Error(`${card} card is not available in Catalog`);
      }
    }
  },
  verifyCardName: (partialCardName: string) => {
    cy.get(catalogPageObj.card)
      .find('div.catalog-tile-pf-title')
      .should('contain.text', partialCardName);
  },
};
