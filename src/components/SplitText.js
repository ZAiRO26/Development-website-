import React from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText - Animates text letter by letter or word by word
 * Creates a premium reveal effect for headlines
 */
const SplitText = ({
    children,
    className = '',
    splitBy = 'letter', // 'letter' or 'word'
    delay = 0,
    stagger = 0.03,
    duration = 0.5,
    animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'slideUp', 'scale'
}) => {
    const text = typeof children === 'string' ? children : '';

    // Split text into array based on splitBy option
    const items = splitBy === 'word'
        ? text.split(' ')
        : text.split('');

    // Animation variants
    const getVariants = () => {
        switch (animation) {
            case 'fadeIn':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case 'slideUp':
                return {
                    hidden: { y: '100%', opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                };
            case 'scale':
                return {
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 }
                };
            case 'fadeUp':
            default:
                return {
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                };
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = {
        hidden: getVariants().hidden,
        visible: {
            ...getVariants().visible,
            transition: {
                duration,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={itemVariants}
                    style={{
                        whiteSpace: splitBy === 'letter' && item === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {item === ' ' ? '\u00A0' : item}
                    {splitBy === 'word' && index < items.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </motion.span>
    );
};

/**
 * TextReveal - Wrapper for headline reveals with masking effect
 */
export const TextReveal = ({
    children,
    className = '',
    delay = 0,
}) => {
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: delay + 0.1,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default SplitText;
