import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../config/firebase';
import { UserData } from '../context/TestContext';

interface UploadData {
  timestamp: any; // Firebase serverTimestamp
  data: {
    geslacht: UserData['geslacht'];
    testResultaten: UserData['testResultaten'];
  };
  version: string;
  submissionId: string; // Random ID voor tracking (niet persoonlijk)
}

/**
 * Upload student data anoniem naar Firebase
 * Geen persoonlijke informatie wordt verzonden
 */
export async function uploadAnoniemData(userData: UserData): Promise<{ success: boolean; message: string }> {
  try {
    // Valideer dat er data is om te uploaden
    if (!userData.geslacht && userData.testResultaten.length === 0) {
      return {
        success: false,
        message: 'Geen gegevens om te uploaden. Vul eerst je geslacht in of doe een test.'
      };
    }

    // Anonieme submission ID (voor tracking, niet persoonlijk)
    const submissionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Bereid anonieme data voor
    const uploadData: UploadData = {
      timestamp: serverTimestamp(),
      data: {
        geslacht: userData.geslacht,
        testResultaten: userData.testResultaten.map(result => ({
          testId: result.testId,
          score: result.score,
          datum: result.datum,
          evaluatie: result.evaluatie
        }))
      },
      version: '1.0',
      submissionId
    };

    // Upload naar Firebase
    const submissionsRef = ref(database, 'submissions');
    await push(submissionsRef, uploadData);

    return {
      success: true,
      message: `✅ Gegevens succesvol geüpload!\n\nReferentie: ${submissionId.slice(-8)}\n\nJe docent kan nu je anonieme testresultaten inzien.`
    };

  } catch (error) {
    console.error('Upload error:', error);
    
    // Gebruiksvriendelijke error berichten
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        return {
          success: false,
          message: '❌ Upload niet toegestaan. Neem contact op met je docent.'
        };
      }
      if (error.message.includes('network')) {
        return {
          success: false,
          message: '❌ Geen internetverbinding. Probeer het later opnieuw.'
        };
      }
    }

    return {
      success: false,
      message: '❌ Upload mislukt. Probeer het later opnieuw of neem contact op met je docent.'
    };
  }
}

/**
 * Check rate limiting - voorkom spam uploads
 */
export function checkRateLimit(): { allowed: boolean; waitTime?: number } {
  const lastUploadKey = 'bmo_last_upload';
  const cooldownMinutes = 5;
  
  const lastUpload = localStorage.getItem(lastUploadKey);
  
  if (lastUpload) {
    const lastUploadTime = new Date(lastUpload);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastUploadTime.getTime()) / (1000 * 60);
    
    if (diffMinutes < cooldownMinutes) {
      const waitTime = Math.ceil(cooldownMinutes - diffMinutes);
      return {
        allowed: false,
        waitTime
      };
    }
  }
  
  return { allowed: true };
}

/**
 * Update rate limit timestamp
 */
export function updateRateLimit(): void {
  const lastUploadKey = 'bmo_last_upload';
  localStorage.setItem(lastUploadKey, new Date().toISOString());
}