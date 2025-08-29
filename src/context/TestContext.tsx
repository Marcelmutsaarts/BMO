import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TestResult {
  testId: string;
  score: number;
  datum: Date;
  evaluatie: string;
}

export interface BLOCResult {
  testId: string;
  scores: any;
  datum: Date;
}

export interface GrondvormenResult {
  scores: { [key: number]: boolean | null };
  datum: Date;
}

export interface UserData {
  geslacht: 'man' | 'vrouw' | null;
  testResultaten: TestResult[];
  blocResultaten?: BLOCResult[];
  grondvormenResultaten?: GrondvormenResult;
}

interface TestContextType {
  userData: UserData;
  setGeslacht: (geslacht: 'man' | 'vrouw') => void;
  addTestResult: (result: TestResult) => void;
  updateTestResult: (testId: string, score: number) => void;
  getTestResult: (testId: string) => TestResult | undefined;
  addBLOCResult: (testId: string, scores: any) => void;
  getBLOCResult: (testId: string) => BLOCResult | undefined;
  addGrondvormenResult: (scores: { [key: number]: boolean | null }) => void;
  getGrondvormenResult: () => GrondvormenResult | undefined;
  clearAllData: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const STORAGE_KEY = 'bmo_fysieke_testen';

export function TestProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        parsed.testResultaten = parsed.testResultaten.map((result: any) => ({
          ...result,
          datum: new Date(result.datum)
        }));
        if (parsed.blocResultaten) {
          parsed.blocResultaten = parsed.blocResultaten.map((result: any) => ({
            ...result,
            datum: new Date(result.datum)
          }));
        }
        if (parsed.grondvormenResultaten) {
          parsed.grondvormenResultaten = {
            ...parsed.grondvormenResultaten,
            datum: new Date(parsed.grondvormenResultaten.datum)
          };
        }
        return parsed;
      } catch {
        return { geslacht: null, testResultaten: [], blocResultaten: [], grondvormenResultaten: undefined };
      }
    }
    return { geslacht: null, testResultaten: [], blocResultaten: [], grondvormenResultaten: undefined };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const setGeslacht = (geslacht: 'man' | 'vrouw') => {
    setUserData(prev => ({ ...prev, geslacht }));
  };

  const addTestResult = (result: TestResult) => {
    setUserData(prev => ({
      ...prev,
      testResultaten: [...prev.testResultaten.filter(r => r.testId !== result.testId), result]
    }));
  };

  const updateTestResult = (testId: string, score: number) => {
    setUserData(prev => ({
      ...prev,
      testResultaten: prev.testResultaten.map(r => 
        r.testId === testId ? { ...r, score, datum: new Date() } : r
      )
    }));
  };

  const getTestResult = (testId: string) => {
    return userData.testResultaten.find(r => r.testId === testId);
  };

  const addBLOCResult = (testId: string, scores: any) => {
    const newResult: BLOCResult = {
      testId,
      scores,
      datum: new Date()
    };
    
    setUserData(prev => ({
      ...prev,
      blocResultaten: [
        ...(prev.blocResultaten || []).filter(r => r.testId !== testId),
        newResult
      ]
    }));
  };

  const getBLOCResult = (testId: string) => {
    return userData.blocResultaten?.find(r => r.testId === testId);
  };

  const addGrondvormenResult = (scores: { [key: number]: boolean | null }) => {
    const newResult: GrondvormenResult = {
      scores,
      datum: new Date()
    };
    
    setUserData(prev => ({
      ...prev,
      grondvormenResultaten: newResult
    }));
  };

  const getGrondvormenResult = () => {
    return userData.grondvormenResultaten;
  };

  const clearAllData = () => {
    setUserData({ geslacht: null, testResultaten: [], blocResultaten: [], grondvormenResultaten: undefined });
  };

  const exportData = () => {
    return JSON.stringify(userData, null, 2);
  };

  const importData = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      parsed.testResultaten = parsed.testResultaten.map((result: any) => ({
        ...result,
        datum: new Date(result.datum)
      }));
      if (parsed.blocResultaten) {
        parsed.blocResultaten = parsed.blocResultaten.map((result: any) => ({
          ...result,
          datum: new Date(result.datum)
        }));
      }
      if (parsed.grondvormenResultaten) {
        parsed.grondvormenResultaten = {
          ...parsed.grondvormenResultaten,
          datum: new Date(parsed.grondvormenResultaten.datum)
        };
      }
      setUserData(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <TestContext.Provider value={{
      userData,
      setGeslacht,
      addTestResult,
      updateTestResult,
      getTestResult,
      addBLOCResult,
      getBLOCResult,
      addGrondvormenResult,
      getGrondvormenResult,
      clearAllData,
      exportData,
      importData
    }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within TestProvider');
  }
  return context;
}