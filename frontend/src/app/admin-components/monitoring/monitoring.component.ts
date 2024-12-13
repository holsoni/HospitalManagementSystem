import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";
import { MatDialog } from "@angular/material/dialog";

interface Anomaly {
  anomalyCount: number;
  originalIpAddress: string;
  originalUser: string;
  avgReconstructionError: number;
  isBlocked?: boolean;  // New property to indicate if the anomaly is blocked
}
interface BlockResponse {
  message: string;
}

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent {
  anomalies: Anomaly[] = [];
  isLoading = false;
  noAnomaliesMessage = ''; // New property to store the "everything is okay" message

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  // Method that sends the request to start monitoring
  startMonitoring() {
    this.isLoading = true;  // Show loading state while waiting for the response
    this.http.get<Anomaly[]>('http://localhost:8080/start-monitoring')
      .subscribe({
        next: (data) => {
          this.anomalies = data; // Store the response data
          this.isLoading = false; // Hide loading state

          // Check if no anomalies are returned
          if (this.anomalies.length === 0) {
            this.noAnomaliesMessage = 'Все в порядку, загроз не виявлено.'; // "Everything is okay" message
          } else {
            this.noAnomaliesMessage = ''; // Clear the message if there are anomalies
          }
        },
        error: (error) => {
          console.error('Error during monitoring:', error);
          this.isLoading = false; // Hide loading state in case of error
          this.noAnomaliesMessage = 'Помилка при виконанні моніторингу.'; // "Error during monitoring" message
        }
      });
  }

  // Method to block the user by sending a request to the Spring API
  blockUser(ipAddress: string, userId: string, anomaly: Anomaly) {
    const url = `http://localhost:8080/block-suspicious-user`;
    const params = { ip: ipAddress, id: userId };

    this.http.post<BlockResponse>(url, null, { params }).subscribe({
      next: (response) => {
        this.showAlert(response.message); // Show success message
        anomaly.isBlocked = true;  // Mark the anomaly as blocked
      },
      error: (error) => {
        console.error('Error blocking user:', error);
        this.showAlert(`Error blocking IP ${ipAddress} and user ${userId}.`);
      }
    });
  }

  showAlert(message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { message },  // Pass the message to the dialog
    });
  }

  protected readonly parseInt = parseInt;
}
