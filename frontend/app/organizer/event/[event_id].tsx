import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function OrganizerEventView() {
  const { event_id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('effectiveness');

  const [talks] = useState([
    {
      _id: 't1',
      title: 'Mastering React Context',
      speaker: 'Jane Doe',
      analytics: {
        effectiveness: {
          clarity_score: 90,
          depth_score: 75,
          actionability_score: 85,
          overall_score: 83,
          insight_string: "Talk was beginner-friendly but lacked practical depth."
        },
        speaker_insights: {
          top_topics: ["React Context", "State Management"],
          audience_suitability: "Beginner",
          strength: "Theoretical Clarity"
        },
        auto_feedback: [
          "Users found the analogies very helpful.",
          "More practical examples would have been beneficial."
        ]
      }
    }
  ]);

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #000; background: #fff; }
            h1 { color: #000; text-align: center; border-bottom: 4px solid #000; padding-bottom: 10px; font-weight: 900; text-transform: uppercase; }
            h2 { color: #333; margin-top: 30px; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom: 5px;}
            .card { background: #fafafa; border: 1px solid #e0e0e0; padding: 20px; margin-bottom: 20px; }
            .score { font-size: 18px; font-weight: bold; color: #000; }
            ul { line-height: 1.6; color: #444; }
          </style>
        </head>
        <body>
          <h1>Event Report</h1>
          <p style="text-align:center; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 2px;">Comprehensive Intelligence</p>
          
          <div class="card">
            <h2>Executive Summary</h2>
            <p>This event was highly successful, featuring strong theoretical clarity across the board. However, attendees indicated a strong desire for more practical, intermediate-level content in future iterations.</p>
          </div>

          <h2>Talk Analytics</h2>
          ${talks.map(t => `
            <div class="card">
              <h3>${t.title} <span style="color:#666; font-size:14px; font-weight: normal;">by ${t.speaker}</span></h3>
              <p><strong>Insight:</strong> ${t.analytics.effectiveness.insight_string}</p>
              <p><strong>Overall Score:</strong> <span class="score">${t.analytics.effectiveness.overall_score}/100</span></p>
              <h4>Auto-Generated Feedback:</h4>
              <ul>
                ${t.analytics.auto_feedback.map(f => `<li>"${f}"</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error("PDF Generation Error", error);
    }
  };

  return (
    <View className="flex-1 bg-black p-6">
      <View className="flex-row justify-between items-center mb-6 mt-10">
        <Text className="text-4xl font-black text-white tracking-tighter">Intelligence</Text>
        <TouchableOpacity 
          className="bg-white px-4 py-3 rounded-none items-center justify-center"
          onPress={generatePDF}
        >
          <Text className="text-black font-bold uppercase tracking-widest text-xs">Export PDF</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="w-full bg-zinc-900 border border-zinc-700 py-4 mb-6 items-center"
        onPress={() => router.push({ pathname: '/organizer/upload-talk', params: { event_id } })}
      >
        <Text className="text-white font-bold uppercase tracking-widest text-sm">Upload New Talk</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View className="bg-zinc-950 flex-row mb-6 border border-zinc-800">
        {['effectiveness', 'speaker', 'audience'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab ? 'border-white bg-zinc-900' : 'border-transparent bg-transparent'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`font-bold uppercase tracking-wider text-xs ${activeTab === tab ? 'text-white' : 'text-zinc-500'}`}>
              {tab === 'effectiveness' ? 'Analytics' : tab === 'speaker' ? 'Speakers' : 'Audience'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1">
        {activeTab === 'effectiveness' && talks.map(talk => (
          <View key={talk._id} className="bg-zinc-950 p-6 mb-4 border border-zinc-800">
            <Text className="text-2xl font-black text-white mb-1 tracking-tighter">{talk.title}</Text>
            <Text className="text-zinc-400 mb-6 font-medium tracking-widest uppercase text-xs">{talk.speaker}</Text>
            
            <View className="bg-black p-4 border-l-4 border-white mb-6">
              <Text className="text-white font-bold uppercase tracking-widest text-xs mb-2">AI Insight</Text>
              <Text className="text-zinc-400 italic">"{talk.analytics.effectiveness.insight_string}"</Text>
            </View>

            <View className="flex-row justify-between flex-wrap">
              <View className="w-[48%] bg-black p-4 mb-3 border border-zinc-800 items-center">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Clarity</Text>
                <Text className="text-white font-black text-2xl">{talk.analytics.effectiveness.clarity_score}</Text>
              </View>
              <View className="w-[48%] bg-black p-4 mb-3 border border-zinc-800 items-center">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Depth</Text>
                <Text className="text-white font-black text-2xl">{talk.analytics.effectiveness.depth_score}</Text>
              </View>
              <View className="w-[48%] bg-black p-4 border border-zinc-800 items-center">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Action</Text>
                <Text className="text-white font-black text-2xl">{talk.analytics.effectiveness.actionability_score}</Text>
              </View>
              <View className="w-[48%] bg-white p-4 border border-white items-center justify-center">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Overall</Text>
                <Text className="text-black font-black text-2xl">{talk.analytics.effectiveness.overall_score}</Text>
              </View>
            </View>
          </View>
        ))}

        {activeTab === 'speaker' && talks.map(talk => (
          <View key={`speaker-${talk._id}`} className="bg-zinc-950 p-6 mb-4 border border-zinc-800">
            <Text className="text-2xl font-black text-white mb-6 tracking-tighter">{talk.speaker}</Text>
            
            <View className="flex-row mb-6">
              <View className="flex-1 mr-2 border-l-2 border-zinc-700 pl-3">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Strength</Text>
                <Text className="text-white font-bold">{talk.analytics.speaker_insights.strength}</Text>
              </View>
              <View className="flex-1 border-l-2 border-zinc-700 pl-3">
                <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Audience Fit</Text>
                <Text className="text-white font-bold">{talk.analytics.speaker_insights.audience_suitability}</Text>
              </View>
            </View>

            <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Top Topics</Text>
            <View className="flex-row flex-wrap">
              {talk.analytics.speaker_insights.top_topics.map((t, i) => (
                <View key={i} className="bg-black border border-zinc-700 px-4 py-2 mr-2 mb-2">
                  <Text className="text-white font-medium text-xs">{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {activeTab === 'audience' && (
          <View className="bg-zinc-950 p-6 mb-4 border border-zinc-800">
            <Text className="text-2xl font-black text-white mb-6 tracking-tighter">Global Audience Metrics</Text>
            
            <View className="mb-6 border-b border-zinc-800 pb-6">
              <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Difficulty Preference</Text>
              <Text className="text-white">"80% of users chose the Intermediate learning mode."</Text>
            </View>

            <View className="mb-6 border-b border-zinc-800 pb-6">
              <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Top Saved Topics</Text>
              <Text className="text-white mb-1">1. React Context (120 saves)</Text>
              <Text className="text-white">2. Performance Optimization (85 saves)</Text>
            </View>

            <View className="bg-black p-4 border-l-4 border-zinc-500">
              <Text className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Auto-Generated Feedback Themes</Text>
              <Text className="text-zinc-400 italic mb-2">- "Users consistently asked for more practical code examples."</Text>
              <Text className="text-zinc-400 italic">- "Theoretical clarity was rated exceptionally high."</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
