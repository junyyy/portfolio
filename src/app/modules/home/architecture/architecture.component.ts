import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mermaid, { RenderResult } from 'mermaid';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent implements AfterViewInit {
  diagramDefinition: string = '';

  @ViewChild('mermaidDiagram', { static: false }) mermainContainer?: ElementRef;
  ngAfterViewInit(): void {
    this.diagramDefinition = this.getDiagramDefiniation();
    mermaid.initialize({ startOnLoad: true });
    mermaid
      .render('mermaid-diagram', this.diagramDefinition)
      .then((res: RenderResult) => {
        if (this.mermainContainer) {
          this.mermainContainer.nativeElement.innerHTML = res.svg;
        }
      });
  }

  getDiagramDefiniation(): string {
    return ` 
    C4Context
    title App Structure
    Person(user, "User")
    BiRel(user, amplify, "")

    System_Boundary(awsBoundary, "AWS") {
        Boundary(apigatewayContainer, "http service") {
        System(apigateway, "API Gateway", "manage http service")

        }
        Boundary(runtime, "hosting env") {
            System(amplify, "Amplify", "hosting web app")
            System(lambda, "Lambda", "main service")
            System(lambda-node, "Lambda", "connect to groq")

        }
        Boundary(idp, "identity service") {
            System(cognito, "Cognito", "identity service provider")
        }
        Boundary(storage, "storage service") {
            System(s3, "S3", "storage service provider")
        }
      }


    System_Boundary(github, "Github", "code repository") {
        Container(spa, "SPA", "angular", "ui")
        Container(backend-golang, "Backend", "golang", "")
        Container(backend-node, "Backend", "Node Js", "groq ai")
    }

    System_Boundary(groq, "GroqAI", "code repository") {
        Container(ai-service, "API", "", "")

    }


    BiRel(amplify, apigateway, "")

    BiRel(apigateway, lambda, "")
    BiRel(lambda, cognito, "auth service")
    BiRel(lambda, s3, "object service")
    BiRel(amplify, spa, "code base, management, deployment")
    Rel(lambda, backend-golang, "runtime and management")
    BiRel(lambda-node, ai-service, "")
    Rel(lambda-node, backend-node, "")
    BiRel(apigateway, lambda-node, "")
    `;
  }
}
