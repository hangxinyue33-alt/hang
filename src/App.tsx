/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { PageId, PersonalityResult } from './types';
import {
  QUIZ_QUESTIONS,
  PERSONALITY_RESULTS,
  calculatePersonalityResult,
} from './data/quizData';
import { PhoneFrame } from './components/PhoneFrame';
import { PageHome } from './components/PageHome';
import { PageIntro } from './components/PageIntro';
import { PageQuiz } from './components/PageQuiz';
import { PageLoading } from './components/PageLoading';
import { PageResult } from './components/PageResult';
import { PagePoster } from './components/PagePoster';
import { GalleryModal } from './components/GalleryModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('page-1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [resultPersonality, setResultPersonality] = useState<PersonalityResult>(
    PERSONALITY_RESULTS[0]
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  // 开始进入说明页 Page2
  const handleStartFromHome = useCallback(() => {
    setCurrentPage('page-2');
  }, []);

  // 开始第一题 Page3 (index 0)
  const handleStartQuiz = useCallback(() => {
    setScores([0, 0, 0, 0, 0, 0]);
    setCurrentQuestionIndex(0);
    setCurrentPage('page-3');
  }, []);

  // 返回首页
  const handleResetToHome = useCallback(() => {
    setScores([0, 0, 0, 0, 0, 0]);
    setCurrentQuestionIndex(0);
    setCurrentPage('page-1');
  }, []);

  // 点击某一题的选项
  const handleSelectOption = useCallback(
    (optionIndex: number, personalityIndex: number) => {
      setScores((prevScores) => {
        const nextScores = [...prevScores];
        nextScores[personalityIndex] = (nextScores[personalityIndex] || 0) + 1;
        return nextScores;
      });

      // 判断进入下一页：
      // Q1(page-3) -> Q2(page-4) -> Q3(page-5) -> Q4(page-6) -> Q5(page-7) -> Q6(page-8)
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        const nextIdx = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIdx);
        // page-3 corresponds to Q0, page-4 to Q1, etc.
        const nextPageId = `page-${nextIdx + 3}` as PageId;
        setCurrentPage(nextPageId);
      } else {
        // 第6题完成后，进入 Page9 (分析加载中)
        setCurrentPage('page-9');
      }
    },
    [currentQuestionIndex]
  );

  // 上一题（如果点错过）
  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      const prevPageId = `page-${prevIdx + 3}` as PageId;
      setCurrentPage(prevPageId);
    }
  }, [currentQuestionIndex]);

  // 加载页 Page9 分析完毕，生成对应人格并进入 Page10-15 (结果页)
  const handleLoadingComplete = useCallback(() => {
    // 根据scores计算最终人格
    const calculated = calculatePersonalityResult(scores);
    setResultPersonality(calculated);
    setCurrentPage('page-result');
  }, [scores]);

  // 从图鉴选择某一结果预览
  const handleSelectPersonalityFromGallery = useCallback(
    (result: PersonalityResult) => {
      setResultPersonality(result);
      setCurrentPage('page-result');
    },
    []
  );

  // 生成我的人格卡或分享海报 (进入 Page16)
  const handleOpenPoster = useCallback(() => {
    soundManager.playClick();
    setCurrentPage('page-poster');
  }, []);

  // 重新测试
  const handleRetake = useCallback(() => {
    handleStartQuiz();
  }, [handleStartQuiz]);

  return (
    <PhoneFrame
      onOpenGallery={() => setIsGalleryOpen(true)}
      onReset={handleResetToHome}
    >
      {/* 页面内容区 */}
      <div className="flex-1 flex flex-col h-full bg-[#FFF9F2] relative overflow-hidden">
        {currentPage === 'page-1' && (
          <PageHome
            onStart={handleStartFromHome}
            onOpenGallery={() => setIsGalleryOpen(true)}
          />
        )}

        {currentPage === 'page-2' && (
          <PageIntro
            onStartQuiz={handleStartQuiz}
            onBack={handleResetToHome}
          />
        )}

        {(currentPage === 'page-3' ||
          currentPage === 'page-4' ||
          currentPage === 'page-5' ||
          currentPage === 'page-6' ||
          currentPage === 'page-7' ||
          currentPage === 'page-8') && (
          <PageQuiz
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            onSelectOption={handleSelectOption}
            onPrevQuestion={currentQuestionIndex > 0 ? handlePrevQuestion : undefined}
          />
        )}

        {currentPage === 'page-9' && (
          <PageLoading onLoadingComplete={handleLoadingComplete} />
        )}

        {currentPage === 'page-result' && (
          <PageResult
            result={resultPersonality}
            onGenerateCard={handleOpenPoster}
            onShareResult={handleOpenPoster}
            onRetake={handleRetake}
            onOpenGallery={() => setIsGalleryOpen(true)}
          />
        )}

        {currentPage === 'page-poster' && (
          <PagePoster
            result={resultPersonality}
            onRetake={handleRetake}
            onBackToResult={() => setCurrentPage('page-result')}
          />
        )}
      </div>

      {/* 全6种人格图鉴弹窗 */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPersonality={handleSelectPersonalityFromGallery}
      />
    </PhoneFrame>
  );
}

