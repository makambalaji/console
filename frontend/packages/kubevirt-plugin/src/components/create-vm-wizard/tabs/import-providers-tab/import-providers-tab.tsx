import * as React from 'react';
import { Form, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { iGet, iGetIn, immutableListToShallowJS } from '../../../../utils/immutable';
import { FormFieldMemoRow } from '../../form/form-field-row';
import { FormField, FormFieldType } from '../../form/form-field';
import { FormSelectPlaceholderOption } from '../../../form/form-select-placeholder-option';
import { vmWizardActions } from '../../redux/actions';
import { ImportProviderRenderableField, ImportProvidersField } from '../../types';
import { ActionType } from '../../redux/types';
import { getPlaceholderKey } from '../../utils/renderable-field-utils';
import { VMWareImportProvider } from './providers/vmware-import-provider/vmware-import-provider';
import { iGetImportProviders } from '../../selectors/immutable/import-providers';
import { OvirtImportProvider } from './providers/ovirt-import-provider/ovirt-import-provider';

import '../../create-vm-wizard-footer.scss';
import { WithTranslation, withTranslation } from 'react-i18next';

class ImportProvidersTabComponent extends React.Component<ImportProvidersTabComponentProps> {
  getField = (key: ImportProvidersField) => iGet(this.props.importProviders, key);

  getFieldAttribute = (key: ImportProvidersField, attribute: string) =>
    iGetIn(this.props.importProviders, [key, attribute]);

  getFieldValue = (key: ImportProvidersField) => iGetIn(this.props.importProviders, [key, 'value']);

  onChange = (key: ImportProviderRenderableField) => (value) =>
    this.props.onFieldChange(key, value);

  render() {
    const { wizardReduxID } = this.props;

    return (
      <Form className="co-m-pane__body co-m-pane__form kubevirt-create-vm-modal__form">
        <FormFieldMemoRow
          field={this.getField(ImportProvidersField.PROVIDER)}
          fieldType={FormFieldType.SELECT}
        >
          <FormField>
            <FormSelect onChange={this.onChange(ImportProvidersField.PROVIDER)}>
              <FormSelectPlaceholderOption
                placeholder={this.props.t(getPlaceholderKey(ImportProvidersField.PROVIDER))}
                isDisabled={!!this.getFieldValue(ImportProvidersField.PROVIDER)}
              />
              {immutableListToShallowJS(
                this.getFieldAttribute(ImportProvidersField.PROVIDER, 'providers'),
              ).map(({ id, name }) => (
                <FormSelectOption key={id} value={id} label={name} />
              ))}
            </FormSelect>
          </FormField>
        </FormFieldMemoRow>
        <OvirtImportProvider wizardReduxID={wizardReduxID} />
        <VMWareImportProvider wizardReduxID={wizardReduxID} />
      </Form>
    );
  }
}

const stateToProps = (state, { wizardReduxID }) => ({
  importProviders: iGetImportProviders(state, wizardReduxID),
});

type ImportProvidersTabComponentProps = WithTranslation & {
  onFieldChange: (key: ImportProviderRenderableField, value: string) => void;
  importProviders: any;
  wizardReduxID: string;
};

const dispatchToProps = (dispatch, props) => ({
  onFieldChange: (key, value) =>
    dispatch(
      vmWizardActions[ActionType.SetImportProvidersFieldValue](props.wizardReduxID, key, value),
    ),
});

export const ImportProvidersTab = connect(
  stateToProps,
  dispatchToProps,
)(withTranslation()(ImportProvidersTabComponent));
