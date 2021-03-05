@knative-eventing
Feature: Event Sources actions on topology side bar
              As a user, I want to perform actions on event sources

        Background:
            Given user has created or selected namespace "aut-topology-side-bar-actions"
              And user has created knative service "nodejs-ex-git"
              And user has created Sink Binding event source "sink-binding"


        @regression
        Scenario: Side bar for event source: Kn-12-TC01
            Given knative service, event source and sink connector are present in topology page
             When user clicks on event source "Sink Binding" to open side bar
             Then user can see side bar with header name "Sink Binding"


        @regression
        Scenario: Move sink modal details: Kn-12-TC02
            Given knative service, event source and sink connector are present in topology page
             When user clicks on event source "Sink Binding" to open side bar
              And user selects "Move sink" from side bar Action menu
             Then modal displays with the header name "Move sink"
              And Resource dropdown is displayed in Move Sink modal


        @smoke
        Scenario: Move sink to different knative service using Action menu of side bar : Kn-12-TC03
            Given knative service, event source and sink connector are present in topology page
              And user has created knative service "nodejs-ex-git-1"
             When user clicks on event source "Sink Binding" to open side bar
              And user selects "Move sink" from side bar Action menu
              And user selects the knative service "nodejs-ex-git-1" from Resource dropdown
              And user clicks save on Move Sink modal
              And user closes the side bar
             Then user will see that event source "sink-binding" is sinked with knative Service "nodejs-ex-git-1"
