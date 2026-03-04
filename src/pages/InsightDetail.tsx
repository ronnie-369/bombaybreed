import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getInsight } from '@/data/insights';
import ReportLandingPage from '@/components/insights/ReportLandingPage';
import ReadAnalysisPage from '@/components/insights/ReadAnalysisPage';

const InsightDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/insights" replace />;

  const data = getInsight(slug);

  if (!data) return <Navigate to="/insights" replace />;

  if (data.contentType === 'Flagship Report') {
    return <ReportLandingPage data={data} />;
  }

  return <ReadAnalysisPage data={data} />;
};

export default InsightDetail;
