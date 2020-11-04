import { displayOptions, nodeActions } from '../constants/topology';
import { helmPage } from './helm-page';
import { app } from './app';
import { modal } from '../../../../integration-tests-cypress/views/modal';
import { detailsPage } from '../../../../integration-tests-cypress/views/details-page';

export const topologyObj = {
  switcher: '[data-test-id="namespace-bar-dropdown"] a',
  graph: {
    reset: '#reset-view',
    zoomIn: '#zoom-in',
    zoomOut: '#zoom-out',
    fitToScreen: '#fit-to-screen',
  },
  list: {
    appName: '#HelmRelease ul li div',
    nodeName: '#HelmRelease ul li div',
  },
  sidePane: {
    dialog: '[role="dialog"]',
    title: '[role="dialog"] h1',
    tabs: '[role="dialog"] li button',
    sectionTitle: '[role="dialog"] h2',
    close: 'button[aria-label="Close"]',
    labelsList: '[data-test="label-list"]',
    editAnnotations: '[data-test-id="edit-annotations"]',
  },
  addStorage: {
    pvc: {
      useExistingClaim: 'input[value="existing"]',
      createNewClaim: {
        newClaim: 'input[value="new]',
        storageClass: '#storageclass-dropdown',
        pvcName: '#pvc-name',
        accessMode: {
          singleUser: 'input[value="ReadWriteOnce"]',
          sharedAccess: 'inputp[value="ReadWriteMany"]',
          readOnly: 'input[value="ReadOnlyMany"]',
          size: '#request-size-input',
          showLabelSelector: 'input[name="showLabelSelector"]',
        },
        volumeMode: {
          fileSystem: 'input[value="Filesystem"]',
          block: 'input[value="Block"]',
          devicePath: '#device-path',
        },
      },
    },
    mountPath: '#mount-path',
    subPath: '#subpath',
    mountAsReadOnly: 'input[name="mountAsReadOnly"]',
    save: '#save-changes',
  },
  revisionDetails: {
    detailsTab: '[data-test-id="horizontal-link-Details"]',
    yamlTab: '[data-test-id="horizontal-link-YAML"]',
    details: {
      resourceSummaryTitle: '[data-test-section-heading="Revision Details"]',
      resourceSummary: '[data-test-id="resource-summary"]',
      conditionsTitle: '[data-test-section-heading="Conditions"]',
    },
    yaml: {
      save: '[data-test="save-changes"]',
      reload: '[data-test="reload-object"]',
      cancel: '[data-test="cancel"]',
    },
  },
};

export const topologyActions = {
  selectAction: (action: nodeActions | string) => {
    switch (action) {
      case 'Edit Application Grouping':
      case nodeActions.EditApplicatoinGrouping: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Edit Pod Count':
      case nodeActions.EditPodCount: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Edit Labels':
      case nodeActions.EditLabels: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        cy.get('form').should('be.visible');
        modal.modalTitleShouldContain('Edit Labels');
        break;
      }
      case 'Edit Annotations':
      case nodeActions.EditAnnotations: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        cy.get('form').should('be.visible');
        modal.modalTitleShouldContain('Edit Annotations');
        break;
      }
      case 'Edit Update Strategy':
      case nodeActions.EditUpdateStrategy: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Delete Deployment':
      case nodeActions.DeleteDeployment: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Delete SinkBinding':
      case nodeActions.DeleteSinkBinding: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Edit SinkBinding':
      case nodeActions.EditSinkBinding: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Move Sink':
      case nodeActions.MoveSink: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      case 'Delete Service':
      case nodeActions.DeleteService: {
        cy.byTestActionID(action)
          .should('be.visible')
          .click();
        break;
      }
      default: {
        throw new Error(`${action} is not available in action menu`);
      }
    }
  },
};

export const topologyPage = {
  verifyTitle: () => {
    cy.get('h1.ocs-page-layout__title').should('have.text', 'Topology');
  },
  verifyTopologyPage: () => {
    app.waitForLoad();
    cy.get(topologyObj.graph.reset).should('be.visible');
  },
  verifyContextMenu: () => cy.get('#popper-container ul').should('be.visible'),
  verifyNoWorkLoadsText: (text: string) =>
    cy.get('h2.co-hint-block__title').should('contain.text', text),
  verifyWorkLoads: () => cy.get('g[data-surface="true"]').should('be.visible'),
  search: (name: string) =>
    cy
      .byLegacyTestID('item-filter')
      .clear()
      .type(name),
  verifyWorkloadInTopologyPage: (appName: string) => {
    cy.get(topologyObj.switcher).click();
    topologyPage.search(appName);
    cy.get('div.is-filtered').should('be.visible');
    cy.get(topologyObj.switcher).click();
  },
  clicKDisplayOptionDropdown: () =>
    cy
      .get('[id^=pf-select-toggle-id]')
      .contains('Display Options')
      .click(),
  selectDisplayOption: (opt: displayOptions) => {
    topologyPage.clicKDisplayOptionDropdown();
    switch (opt) {
      case displayOptions.PodCount:
        cy.get('#pf-random-id-1-show-pod-count').check();
        break;
      case displayOptions.Labels:
        cy.get('#pf-random-id-1-show-labels').check();
        break;
      case displayOptions.ApplicationGroupings:
        cy.get('#pf-random-id-1-expand-app-groups').check();
        break;
      default:
        throw new Error('Option is not available');
        break;
    }
  },
  filterByResource: (resourceName: string) => {
    cy.get('[id^=pf-select-toggle-id]')
      .contains('Filter by Resource')
      .click();
    cy.get(`[id$="${resourceName}"]`).check();
  },
  verifyPipelineRunStatus: (status: string) =>
    cy
      .get('li.list-group-item.pipeline-overview')
      .next('li')
      .find('span.co-icon-and-text span')
      .should('have.text', status),
  searchHelmRelease: (name: string) => {
    topologyPage.search(name);
    cy.get('[data-kind="node"]').then(($el) => {
      if ($el.find('g.is-filtered').length === 0) {
        helmPage.createHelmRelease(name);
        cy.get('[data-kind="node"] g.is-filtered').should('be.visible');
      } else {
        cy.log('Helm Release is already available');
        cy.get('[data-kind="node"] g.is-filtered').should('be.visible');
      }
    });
  },
  verifyHelmReleaseSidePaneTabs: () => {
    cy.get(topologyObj.sidePane.tabs)
      .eq(0)
      .should('contain.text', 'Details');
    cy.get(topologyObj.sidePane.tabs)
      .eq(1)
      .should('contain.text', 'Resources');
    cy.get(topologyObj.sidePane.tabs)
      .eq(2)
      .should('contain.text', 'Release Notes');
  },
  appNode: (appName: string) => {
    return cy.get(`[data-id="group:${appName}"] g.odc-resource-icon text`).contains('A');
  },
  getRoute: (nodeName: string) => {
    return cy
      .get('[data-test-id="base-node-handler"] > text')
      .contains(nodeName)
      .parentsUntil('[data-test-id="base-node-handler"]')
      .next('a')
      .eq(2);
  },
  getBuild: (nodeName: string) => {
    return cy.get(`a[href="/k8s/ns/aut/builds/${nodeName}-1/logs"]`);
  },
  componentNode: (nodeName: string) => {
    return cy.get('g.odc-base-node__label > text').contains(nodeName);
  },
  getEventSource: (eventSource: string) => {
    return cy.get('[data-type="event-source"] g.odc-base-node__label > text').contains(eventSource);
  },
  revisionNode: (serviceName: string) => {
    return cy
      .get('g.odc-base-node__label > text')
      .contains(serviceName)
      .parentsUntil('[data-type="knative-service"]')
      .children('[data-type="knative-revision"] circle[filter$="graph#NodeShadowsFilterId)"]');
  },
  verifyContextMenuOptions: (...options: string[]) => {
    cy.get('#popper-container li[role="menuitem"]').each(($el) => {
      expect(options).contains($el.text());
    });
  },
  clickContextMenuOption: (menuOption: string) =>
    cy.byTestActionID(menuOption).click({ force: true }),
  verifyDecorators: (nodeName: string, numOfDecorators: number) =>
    topologyPage
      .componentNode(nodeName)
      .siblings('a')
      .should('have.length', numOfDecorators),
  selectContextMenuAction: (action: nodeActions | string) =>
    cy
      .byTestActionID(action)
      .should('be.visible')
      .click(),
  rightClickOnNode: (releaseName: string) => {
    cy.get('g.odc-base-node__label')
      .should('be.visible')
      .contains(releaseName)
      .trigger('contextmenu', { force: true });
  },
  clickOnNode: (releaseName: string) => {
    cy.get('g.odc-base-node__label')
      .should('be.visible')
      .contains(releaseName)
      .click({ force: true });
  },
  clickOnSinkBinding: () => {
    cy.get('g.odc-base-node__label')
      .should('be.visible')
      .contains('sink-binding')
      .click({ force: true });
  },
  rightClickOnKnativeRevision: () => {
    cy.byLegacyTestID('base-node-handler')
      .find('g.odc-resource-icon')
      .trigger('contextmenu', { force: true });
  },
  clickOnKnativeRevision: () => {
    cy.byLegacyTestID('base-node-handler')
      .find('g.odc-resource-icon')
      .click({ force: true });
  },
  waitForKnativeRevision: () => {
    cy.get('[data-test-id="base-node-handler"]', { timeout: 300000 }).should('be.visible');
  },
  rightClickOnHelmWorkload: () => {
    cy.byLegacyTestID('base-node-handler')
      .find('circle')
      .trigger('contextmenu', { force: true });
  },
  addStorage: {
    pvc: {
      clickUseExistingClaim: () => {
        cy.get(topologyObj.addStorage.pvc.useExistingClaim).check();
      },
      createNewClaim: {
        clickCreateNewClaim: () => {
          cy.get(topologyObj.addStorage.pvc.createNewClaim.newClaim).check();
        },
        selectStorageClass: (storageClass: string = 'standard') => {
          cy.get(topologyObj.addStorage.pvc.createNewClaim.storageClass).click();
          cy.byLegacyTestID('dropdown-text-filter').type(storageClass);
          cy.get('ul[role="listbox"]')
            .find('li')
            .contains(storageClass)
            .click();
        },
        enterPVCName: (name: string) => {
          cy.get(topologyObj.addStorage.pvc.createNewClaim.pvcName).type(name);
        },
        enterSize: (size: string) => {
          cy.get(topologyObj.addStorage.pvc.createNewClaim.accessMode.size).type(size);
        },
      },
    },
    enterMountPath: (mountPath: string) => {
      cy.get(topologyObj.addStorage.mountPath).type(mountPath);
    },
    clickSave: () => {
      cy.get(topologyObj.addStorage.save).click();
    },
  },
  revisionDetails: {
    clickOnDetailsTab: () => cy.get(topologyObj.revisionDetails.detailsTab).click(),
    clickOnYAMLTab: () => cy.get(topologyObj.revisionDetails.yamlTab).click(),
    details: {
      verifyRevisionSummary: () =>
        cy.get(topologyObj.revisionDetails.details.resourceSummary).should('be.visible'),
      verifyConditionsSection: () =>
        cy.get(topologyObj.revisionDetails.details.conditionsTitle).should('be.visible'),
    },
    yaml: {
      clickOnSave: () => cy.get(topologyObj.revisionDetails.yaml.save).click(),
    },
  },
};

export const topologySidePane = {
  verify: () => cy.get(topologyObj.sidePane.dialog).should('be.visible'),
  verifyTitle: (nodeName: string) => cy.get(topologyObj.sidePane.title).should('contain', nodeName),
  verifySelectedTab: (tabName: string) =>
    cy
      .get(topologyObj.sidePane.tabs)
      .contains(tabName)
      .parent('li')
      .should('have.class', 'co-m-horizontal-nav-item--active'),
  verifyTab: (tabName: string) =>
    cy
      .get(topologyObj.sidePane.tabs)
      .contains(tabName)
      .should('be.visible'),
  selectTab: (tabName: string) =>
    cy
      .get(topologyObj.sidePane.tabs)
      .contains(tabName)
      .click(),
  verifySection: (sectionTitle: string) =>
    cy
      .get(topologyObj.sidePane.sectionTitle)
      .contains(sectionTitle)
      .should('be.visible'),
  verifyActions: (...actions: string[]) => {
    cy.byLegacyTestID('action-items')
      .find('li')
      .each(($el) => {
        expect(actions).contains($el.text());
      });
  },
  close: () =>
    cy
      .get('button[aria-label="Close"]')
      .scrollIntoView()
      .click(),
  verifyFieldinDetailsTab: (fieldName: string) =>
    cy.get(`[data-test-selector="details-item-label__${fieldName}"]`).should('be.visible'),
  verifyWorkload: () =>
    cy
      .get('[role="dialog"] h2')
      .contains('Services')
      .next('ul li a')
      .should('be.visible'),
  verifyFieldValue: (fieldName: string, fieldValue: string) =>
    cy
      .get(`[data-test-selector="details-item-value__${fieldName}"]`)
      .should('contain.text', fieldValue),
  selectAddHealthChecks: () =>
    cy
      .get('a')
      .contains('Add Health Checks')
      .click(),
  verifyWorkloadInAppSideBar: (workloadName: string) =>
    cy.get('[role="dialog"] a').should('contain.text', workloadName),
  selectNodeAction: (action: nodeActions | string) => {
    cy.byLegacyTestID('actions-menu-button').click();
    topologyActions.selectAction(action);
  },
  verifyLabel: (labelName: string) => {
    cy.get('dt[data-test-selector$="Labels"]').should('be.visible');
    cy.byButtonText('Edit').click();
    modal.shouldBeOpened();
    cy.get('span.tag-item__content')
      .contains(labelName)
      .scrollIntoView()
      .should('be.visible');
    // cy.byTestID("label-list").find("a").contains(labelName).should("be.visible");
    modal.cancel();
  },
  verifyAnnotaiton: (annotationName: string) => {
    cy.byLegacyTestID('edit-annotations').click();
    cy.byTestID('label-list')
      .find('a')
      .contains(annotationName)
      .should('be.visible');
  },
  verifyNumberOfAnnotations: (num: string) => {
    cy.get('[data-test-selector="details-item-label__Annotations"]').should('be.visible');
    cy.get(topologyObj.sidePane.editAnnotations).then(($el) => {
      let res = $el.text().split(' ');
      expect(res[0]).eq(num);
    });
  },
  verifyResource: (resourceName: string) => {
    cy.get(topologyObj.sidePane.tabs)
      .contains('Resources')
      .click();
    cy.byLegacyTestID(resourceName).should('be.visible');
  },
  clickStartLastRun: () => {
    cy.get('[role="dialog"] li.list-group-item.pipeline-overview div button')
      .should('be.enabled')
      .click();
  },
  verifyPipelineRuns: () => {
    cy.get('li.odc-pipeline-run-item').should('be.visible');
  },
};

export const addHealthChecksObj = {
  readinessProbe: {
    requestType: '#form-dropdown-healthChecks-readinessProbe-data-requestType-field',
    httpHeaderName: 'input[placeholder="header name"]',
    httpHeaderValue: 'input[placeholder="value"]',
    path: '#form-input-healthChecks-readinessProbe-data-httpGet-path-field',
    port: '#form-input-healthChecks-readinessProbe-data-httpGet-port-field',
    failureThreshold: '#form-input-healthChecks-readinessProbe-data-failureThreshold-field',
    successThreshold: '#form-input-healthChecks-readinessProbe-data-successThreshold-field',
    initialDelay: '#form-input-healthChecks-readinessProbe-data-initialDelaySeconds-field',
    period: '#form-input-healthChecks-readinessProbe-data-periodSeconds-field',
    timeout: '#form-input-healthChecks-readinessProbe-data-timeoutSeconds-field',
  },
  livenessProbe: {
    requestType: '#form-dropdown-healthChecks-livenessProbe-data-requestType-field',
    httpHeaderName: 'input[placeholder="header name"]',
    httpHeaderValue: 'input[placeholder="value"]',
    path: '#form-input-healthChecks-livenessProbe-data-httpGet-path-field',
    port: '#form-input-healthChecks-livenessProbe-data-httpGet-port-field',
    failureThreshold: '#form-input-healthChecks-livenessProbe-data-failureThreshold-field',
    successThreshold: '#form-input-healthChecks-livenessProbe-data-successThreshold-field',
    initialDelay: '#form-input-healthChecks-livenessProbe-data-initialDelaySeconds-field',
    period: '#form-input-healthChecks-livenessProbe-data-periodSeconds-field',
    timeout: '#form-input-healthChecks-livenessProbe-data-timeoutSeconds-field',
  },
  startupProbe: {
    requestType: '#form-dropdown-healthChecks-startupProbe-data-requestType-field',
    httpHeaderName: 'input[placeholder="header name"]',
    httpHeaderValue: 'input[placeholder="value"]',
    path: '#form-input-healthChecks-startupProbe-data-httpGet-path-field',
    port: '#form-input-healthChecks-startupProbe-data-httpGet-port-field',
    failureThreshold: '#form-input-healthChecks-startupProbe-data-failureThreshold-field',
    successThreshold: '#form-input-healthChecks-startupProbe-data-successThreshold-field',
    initialDelay: '#form-input-healthChecks-startupProbe-data-initialDelaySeconds-field',
    period: '#form-input-healthChecks-startupProbe-data-periodSeconds-field',
    timeout: '#form-input-healthChecks-startupProbe-data-timeoutSeconds-field',
  },
  add: '[data-test-id="submit-button"]',
  cancel: '[data-test-id="reset-button"]',
};

export const addHealthChecksPage = {
  verifyTitle: () => detailsPage.titleShouldContain('Add Health Checks'),
  clickCheckIcon: () => cy.byLegacyTestID('check-icon').click(),
  clickCancelIcon: () => cy.byLegacyTestID('close-icon').click(),
  addReadinessProbe: () => {
    cy.byButtonText('Add Readiness Probe').click();
    cy.get('div.odc-heath-check-probe-form').should('be.visible');
    addHealthChecksPage.clickCheckIcon();
    cy.get('span.odc-heath-check-probe__successText')
      .contains('Readiness Probe Added')
      .should('be.visible');
  },
  addLivenessProbe: () => {
    cy.byButtonText('Add liveness Probe')
      .scrollIntoView()
      .click();
    cy.get('div.odc-heath-check-probe-form').should('be.visible');
    addHealthChecksPage.clickCheckIcon();
    cy.get('span.odc-heath-check-probe__successText')
      .contains('Liveness Probe Added')
      .should('be.visible');
  },
  addStartupProbe: () => {
    cy.byButtonText('Add Startup Probe')
      .scrollIntoView()
      .click();
    cy.get('div.odc-heath-check-probe-form').should('be.visible');
    addHealthChecksPage.clickCheckIcon();
    cy.get('span.odc-heath-check-probe__successText')
      .contains('Startup Probe Added')
      .should('be.visible');
  },
};

export const addStorage = {};
