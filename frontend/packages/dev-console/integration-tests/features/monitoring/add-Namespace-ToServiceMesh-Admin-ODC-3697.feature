@monitoring
Feature: Associate Kiali Dashboard and get Kiali dashboard link to Topology filterbar by adding a namespace to the Service Mesh
    User should be able to add a namespace to Service Mesh to get the Kiali dashboard link for that namespace on the Topology filterbar

    Background: 
        Given user has logged in as kubeadmin
        And user is at administrator perspective
        And user has installed ElasticSearch Operator provided by Red Hat
        And user has installed Red Hat OpenShift Jaeger Operator
        And user has installed Kiali Operator provided by Red Hat
        And user has installed Red Hat OpenShift Service Mesh Operator
        And user has created new project "istio-system"
        And user has created Istio Service Mesh Control Plane instance in "istio-system" namespace
        And user has created Istio Service Mesh Member Roll instance


    @regression, @manual
    Scenario: Enrolling a project to Service Mesh by creating ServiceMeshMember using Control Plane YAML
        Given user is on the Installed Operator page
        And user has selected project where he has created Service Mesh Member Roll
        When user clicks on Red Hat OpenShift Service Mesh Operator
        And user clicks on Istio Service Mesh Member Roll tab
        And user clicks on the ServiceMeshMember Roll created
        And user clicks on YAML tab
        And user adds the project under spec.members in YAML
        And user saves the YAML
        And user reloads the YAML to see the changes
        Then user will see the recently added Istio Service Mesh Member under spec.members


    @regression
    Scenario: Enrolling a project to Service Mesh by creating ServiceMeshMember using All Instances tab
        Given user is on the Installed Operator page
        And user has selected project that he wanted to add as Service Mesh Member
        When user clicks on Red Hat OpenShift Service Mesh Operator
        And user clicks on All Instances tab
        And user clicks on Create New dropdown
        And user clicks Istio Service Mesh Member
        And user selects Service Mesh Control Plane namespace
        And user clicks on Create button
        Then user will see the recently added Istio Service Mesh Member


    @regression
    Scenario: Open on Kiali link  Project Details Overview Page
        Given user is on the Projects page
        When user selects project that recently added Istio Service Mesh Member
        Then user will see the Service Mesh Enabled inside Details card
        And user will see the Launcher card
        And user will see Open on Kiali link inside Launcher card


    @regression
    Scenario: Open on Kiali link Project Details Page
        Given user is on the Projects page
        When user selects project that recently added Istio Service Mesh Member
        And user clicks on the Details page
        Then user will see the Service Mesh Enabled
        And user will see the Launcher section
        And user will see Kiali link inside Launcher section


    @regression
    Scenario: Kiali link in the Topology filterbar
        Given user is at Developer perspective
        And user selects project that recently added Istio Service Mesh Member
        When user clicks on the Topology page
        Then user will see Kiali link in the Topology filterbar


    @regression
    Scenario: Click on Kiali link from Kubeadmin
        Given user is at Developer perspective
        And user selects project that recently added Istio Service Mesh Member
        When user clicks on the Topology page
        And user click on Kiali Dashboard link
        And user proceeds to unsafe link
        And user clicks on Log In With OpenShift button
        And user enters the credentials for kubeadmin
        And user clicks on Log In button
        Then user will see the Kiali Dashboard for that namespace
