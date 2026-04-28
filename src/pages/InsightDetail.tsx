import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getInsight } from '@/data/insights';
import ReportLandingPage from '@/components/insights/ReportLandingPage';
import ReadAnalysisPage from '@/components/insights/ReadAnalysisPage';
import LadderStickyPill from '@/components/insights/LadderStickyPill';

const InsightDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/insights" replace />;

  const data = getInsight(slug);

  if (!data) return <Navigate to="/insights" replace />;

  return (
    <>
      {data.contentType === 'Flagship Report' ? (
        <ReportLandingPage data={data} />
      ) : (
        <ReadAnalysisPage data={data} />
      )}
      <LadderStickyPill />
    </>
  );
};

export default InsightDetail;
