import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mermaid, { RenderResult } from 'mermaid';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss'
})
export class ArchitectureComponent implements AfterViewInit {
  diagramDefinition: string = ''

  @ViewChild('mermaidDiagram', {static: false}) mermainContainer?: ElementRef
   ngAfterViewInit(): void {
     this.diagramDefinition = this.getDiagramDefiniation();
     mermaid.initialize({ startOnLoad: true });
     mermaid.render('mermaid-diagram', this.diagramDefinition).then((res: RenderResult) => {
      if (this.mermainContainer) {
        this.mermainContainer.nativeElement.innerHTML = res.svg;
      }
     })
   }




  getDiagramDefiniation(): string {
    return `       C4Context
    title App Structure
    Person(user, "User")
    Rel(user, amplify, "use")
    System_Boundary(github, "Github", "code repository") {
    Container(spa, "SPA", "angular", "The main interface that the user interacts with")
    Container(backend, "Backend", "golang", "handle http request")
    }

    System_Boundary(awsBoundary, "AWS") {
        Boundary(runtime, "Hosting env") {
            System(amplify, "Amplify", "hosting web app")
            System(lambda, "Lambda", "lambda function runtime")

        }
        Boundary(apigatewayContainer, "Http service") {
            System(apigateway, "API Gateway", "manage http service")

        }
        Boundary(other, "Other service") {
            System(cognito, "Cognito", "identity service provider")
            System(s3, "S3", "storage service provider")
        }
      }

    Rel(amplify, apigateway, "send http request")
    Rel(apigateway, lambda, "trigger lambda")
    BiRel(lambda, cognito, "auth service")
    BiRel(lambda, s3, "object service")
    BiRel(amplify, spa, "code base, management, deployment")
    Rel(lambda, backend, "runtime and management")
    `
  }
 }
