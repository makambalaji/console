export enum devNavigationMenu {
  Add = '+Add',
  Topology = ' Topology',
  Monitoring = 'Monitoring',
  Builds = 'Builds',
  Search = 'Search',
  Helm = 'Helm',
  Project = 'Project',
  ProjectAccess = 'Project Access',
  Pipelines = 'Pipelines',
  ConfigMaps = 'Config Maps',
  Secrets = 'Secrets',
  GitOps = 'GitOps',
  Environments = 'Environments',
}

export enum switchPerspective {
  Developer = 'Developer',
  Administrator = 'Administrator',
}

export enum operators {
  PipelinesOperator = 'Pipeline',
  ServerlessOperator = 'Serverless',
  VirtualizationOperator = 'Virtualization',
  RedHatCamelKOperator = 'Red Hat Integration - Camel K',
  ApacheCamelKOperator = 'Camel K Operator',
  knativeApacheCamelOperator = 'Knative Apache Camel Operator',
  EclipseCheOperator = 'Eclipse Che',
  GitOpsOperator = 'GitOps',
  WebTerminalOperator = 'Web Terminal',
  ApacheKafka = 'Red Hat Integration - AMQ Streams',
}

export enum authenticationType {
  BasicAuthentication = 'Basic Authentication',
  SSHKey = 'SSHKey',
}
