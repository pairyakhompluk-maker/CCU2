
import React from 'react';
import { 
  Pill, 
  Wind, 
  Music, 
  HeartHandshake, 
  Smile, 
  Meh, 
  Frown, 
  Angry, 
  ThermometerSnowflake,
  CloudRain,
  Waves,
  AudioLines,
  Sprout,
  Mic2,
  Brain,
  Bed,
  Fan,
  PlusCircle
} from 'lucide-react';

export const FACES_CONFIG = [
  { score: 0, label: 'ไม่ปวดเลย', color: 'text-green-500', icon: <Smile className="w-12 h-12" /> },
  { score: 2, label: 'ปวดเล็กน้อย', color: 'text-lime-500', icon: <Smile className="w-12 h-12" /> },
  { score: 4, label: 'ปวดมากขึ้น', color: 'text-yellow-500', icon: <Meh className="w-12 h-12" /> },
  { score: 6, label: 'ปวดมาก', color: 'text-orange-500', icon: <Frown className="w-12 h-12" /> },
  { score: 8, label: 'ปวดทรมาน', color: 'text-red-500', icon: <Frown className="w-12 h-12" /> },
  { score: 10, label: 'ปวดที่สุด', color: 'text-red-700', icon: <Angry className="w-12 h-12" /> },
];

export const MUSIC_GENRES = [
  { id: 'nature', title: 'เสียงธรรมชาติ', sub: 'เสียงฝน, ป่าไม้', icon: <CloudRain className="w-5 h-5" /> },
  { id: 'waves', title: 'เสียงคลื่นทะเล', sub: 'สม่ำเสมอ ผ่อนคลาย', icon: <Waves className="w-5 h-5" /> },
  { id: 'classical', title: 'ดนตรีคลาสสิก', sub: 'เปียโน, ออร์เคสตรา', icon: <Music className="w-5 h-5" /> },
  { id: 'thai', title: 'ดนตรีบรรเลงไทย', sub: 'ขลุ่ย, ระนาดเอก', icon: <Mic2 className="w-5 h-5" /> },
  { id: 'spa', title: 'เพลงแนวสปา/บำบัด', sub: 'เน้นความสงบ', icon: <Sprout className="w-5 h-5" /> },
  { id: 'alpha', title: 'เสียงสมาธิ (Alpha)', sub: 'ปรับคลื่นสมอง', icon: <AudioLines className="w-5 h-5" /> },
];

export const MANAGEMENT_OPTIONS = [
  {
    id: 'medication',
    category: 'PHARMACO',
    title: 'จัดการด้วยยา (Pharmacological)',
    description: 'ให้ยาแก้ปวด/ยาขยายหลอดลม ตามแผนการรักษาของแพทย์',
    icon: <Pill className="w-8 h-8 text-blue-600" />
  },
  {
    id: 'cold-compress',
    category: 'NON_PHARMACO',
    title: 'ประคบเย็น',
    description: 'ใช้เจลเย็นประคบบริเวณที่ปวดเพื่อลดการอักเสบและบวม',
    icon: <ThermometerSnowflake className="w-8 h-8 text-cyan-500" />
  },
  {
    id: 'music-therapy',
    category: 'NON_PHARMACO',
    title: 'ดนตรีบำบัด',
    description: 'เปิดเพลงบรรเลงหรือเสียงธรรมชาติเพื่อเบี่ยงเบนความสนใจ',
    icon: <Music className="w-8 h-8 text-purple-500" />
  },
  {
    id: 'heart-massage',
    category: 'NON_PHARMACO',
    title: 'นวดด้วยใจ',
    description: 'การสัมผัสอย่างเบามือและนวดเบาๆ เพื่อให้รู้สึกปลอดภัย',
    icon: <HeartHandshake className="w-8 h-8 text-pink-500" />
  },
  {
    id: 'meditation',
    category: 'NON_PHARMACO',
    title: 'ทำสมาธิ / หายใจ',
    description: 'ฝึกการหายใจลึกๆ และทำสมาธิเพื่อความสงบภายใน',
    icon: <Brain className="w-8 h-8 text-indigo-500" />
  },
  {
    id: 'positioning',
    category: 'NON_PHARMACO',
    title: 'จัดท่าทาง',
    description: 'ปรับท่านอนหรือท่านั่งให้เหมาะสมเพื่อลดความไม่สุขสบาย',
    icon: <Bed className="w-8 h-8 text-orange-500" />
  },
  {
    id: 'fan',
    category: 'NON_PHARMACO',
    title: 'เปิดพัดลม',
    description: 'ใช้อากาศไหลเวียนเพื่อช่วยลดความรู้สึกเหนื่อยหอบ',
    icon: <Fan className="w-8 h-8 text-sky-400" />
  },
  {
    id: 'other',
    category: 'NON_PHARMACO',
    title: 'อื่นๆ',
    description: 'วิธีการจัดการอื่นๆ ที่เหมาะสมกับอาการของผู้ป่วย',
    icon: <PlusCircle className="w-8 h-8 text-gray-500" />
  }
];
